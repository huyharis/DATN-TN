const alphabetSer = require("./alphabet.service");

exports.getAll = (req, res, next) => {
  const { _id } = req.user;
  var page = parseInt(req.query.page) || 0;
  var limit = parseInt(req.query.limit) || 5;
  var type=req.query.type
  alphabetSer
    .getAll(_id, page, limit,type)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      next(err);
    });
};
