const router = require('express').Router()
const gameCtrl = require('./game.controller')
const userCtrl = require('../users/user.controller')

router.post("/invite-friend",userCtrl.authentication(),gameCtrl.inviteFriend)
router.post("/accept",userCtrl.authentication(),gameCtrl.acceptFriend)

module.exports = router