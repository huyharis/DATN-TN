const router = require('express').Router()
const notifyCtrl = require('./notify.controller')
const userCtrl = require('../users/user.controller')

router.get("/",userCtrl.authentication(),notifyCtrl.getAllNotify)
router.post("/",userCtrl.authentication(),notifyCtrl.create)
router.get("/user",userCtrl.authentication(),notifyCtrl.getNotifyForUser)
router.delete("/",userCtrl.authentication(),notifyCtrl.delete)
router.put("/updateSeen",userCtrl.authentication(),notifyCtrl.updateSeen)
module.exports = router