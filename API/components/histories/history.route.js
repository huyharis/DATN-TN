const router = require('express').Router()
const userCtrl = require('../users/user.controller');
const historyCtrl = require('./history.controller')
router.post('/set-history', userCtrl.authentication(), historyCtrl.setHistory)
router.post('/update-history', userCtrl.authentication(), historyCtrl.upDateHistory)
router.get('/current-history', userCtrl.authentication(), historyCtrl.getCurrent)
router.get('/vocabulary-history/:id', userCtrl.authentication(), historyCtrl.vocabulary)
module.exports = router;