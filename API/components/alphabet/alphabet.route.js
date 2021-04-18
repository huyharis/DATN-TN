const router = require('express').Router()
const alphabetCtr = require('./alphabet.controller')
const userCtrl = require('../users/user.controller')
router.get("/",userCtrl.authentication(),alphabetCtr.getAll)

module.exports = router