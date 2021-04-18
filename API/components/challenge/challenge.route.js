const router = require('express').Router()
const challengeCtr = require('./challenge.controller')
const userCtrl = require('../users/user.controller')

router.get('/',  userCtrl.authentication(),challengeCtr.getAll)
router.get('/random',  userCtrl.authentication(),challengeCtr.getRandom)
router.get('/:id', userCtrl.authentication(),challengeCtr.getById)
// router.post('/importDB', userCtrl.authentication(), challengeCtr.importDB)

module.exports = router;