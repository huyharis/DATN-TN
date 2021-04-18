const notifyService = require("./notify.service.js");
const avatarCtrl = require("../avatars/avatar.controller");

exports.getAllNotify = (req, res, next) => {
  notifyService
    .getAllNotify()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
};
exports.getNotifyForUser = (req, res, next) => {
  const { _id } = req.user;
  var page = parseInt(req.query.page) || 0;
  var limit = parseInt(req.query.limit) || 5;
  notifyService
    .getNotifyForUser(_id, page, limit)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
};
exports.create = (req, res, next)  => {
  console.log("oke");
  console.log(req.body)
  console.log(req.user)
  const { _id } = req.user;
  console.log(_id);
  notifyService
    .create({ ...req.body }, _id)
    .then(response => {
      res.json({ success: true });
    })
    .catch(err => {
      next(err);
    });
};
exports.delete = (req, res, next) => {
  const { _id } = req.query;
  notifyService
    .delete(_id)
    .then(response => {
      res.json({ success: true });
    })
    .catch(err => {
      next(err);
    });
};
exports.updateSeen = (req, res, next) => {
  const _id = req.user;
  const { id_Notify } = req.body;
  notifyService
    .updateSeen(id_Notify, _id)
    .then(response => {
      res.json({ success: true });
    })
    .catch(err => {
      next(err);
    });
};
