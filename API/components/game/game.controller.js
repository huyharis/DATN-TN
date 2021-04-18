const gameService = require("./game.service.js");
const avatarCtrl = require("../avatars/avatar.controller");

exports.inviteFriend = (req, res, next) => {
  gameService
    .inviteFriend(req.body,req.user._id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
};
exports.acceptFriend = (req, res, next) => {
  const { _id } = req.user;
  gameService
    .acceptFriend(req.body,_id)
    .then(response => {
      res.json({success:true});
    })
    .catch(err => {
      next(err);
    });
};
