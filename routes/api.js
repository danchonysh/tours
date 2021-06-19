const router = require('express').Router()
const tourController = require('../controllers/tourController.js')
const userController = require('../controllers/userController.js')

router.get('/tours', tourController.getMany)
router.post('/tours', tourController.addOne)
router.delete('/tours/:id', tourController.removeOne)
router.put('/tours/:id', tourController.editOne)

router.post('/user/auth', userController.auth)
router.post('/user/regis', userController.regis)
router.get('/user', userController.getAll)
router.delete('/user/:id', userController.deleteOne)
router.get('/user/orders/:id', userController.getOrders)
router.patch('/user/subscribe/:id', userController.subscribe)
router.patch('/user/unsubscribe/:id', userController.unsubscribe)

module.exports = router