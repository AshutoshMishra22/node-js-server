var express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');
var router = express.Router();
const userModel = require('../dbSetup');

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  req.session.ban = true;
  res.render('index', { title: 'Express' });
});
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.send('welcome to profile');
});
router.post('/register', function (req, res) {
  const user_data = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });
  userModel
    .register(user_data, req.body.password)
    .then(function (registered_user) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    });
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
  function (req, res) {}
);
router.get('/logout', function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
/**-------------------------------------------------------------------- */
router.get('/cookies', function (req, res, next) {
  res.cookie('age', '100');
  res.render('index', { title: 'Express' });
});
router.get('/clearcookies', function (req, res, next) {
  res.clearCookie();
  res.render('index', { title: 'Express' });
});
router.get('/checkban', function (req, res, next) {
  req.session.ban = true;
  if (req.session.ban) {
    req.session.destroy();
  }
  res.render('index', { title: 'Express' });
});
router.get('/create', async function (req, res, next) {
  const createdUser = await userModel.create({
    username: 'ashutosh',
    name: 'ashutoshmishra',
    age: 26,
  });
  res.send(createdUser);
});
router.get('/find', async function (req, res, next) {
  const regex = new RegExp('^Ashutosh$', 'i'); // case insensitivity
  const createdUser = await userModel.find({ username: regex });
  res.send(createdUser);
});
router.get('/findfield', async function (req, res, next) {
  const createdUser = await userModel.find({ age: { $all: ['fashion'] } });
  res.send(createdUser);
});
router.get('/existfield', async function (req, res, next) {
  const createdUser = await userModel.find({ categories: { $exists: true } });
  res.send(createdUser);
});

module.exports = router;
