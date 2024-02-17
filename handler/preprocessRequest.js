function formatRequest(req, res, next) {
  const update_req = { ...req };
  update_req.url = update_req.url.toLowerCase();
  req = update_req;
  next();
}

module.exports = { formatRequest };
