const router = require('express').Router()
const tourController = require('../controllers/tourController.js')
const hotelController = require('../controllers/hotelController.js')
const cityController = require('../controllers/cityController.js')
const countryController = require('../controllers/countryController.js')

router.get('/country', countryController.getMany)
router.post('/country', countryController.addOne)
router.delete('/country/:id', countryController.removeOne)
router.put('/country/:id', countryController.editOne)

router.get('/city/:id', cityController.getMany)
router.post('/city', cityController.addOne)
router.delete('/city/:id', cityController.removeOne)
router.put('/city/:id', cityController.editOne)

router.get('/hotel/:id', hotelController.getMany)
router.post('/hotel', hotelController.addOne)
router.delete('/hotel/:id', hotelController.removeOne)
router.put('/hotel/:id', hotelController.editOne)

router.get('/tours', tourController.getMany)
router.get('/tours/:id', tourController.getOne)
router.post('/tours', tourController.addOne)
router.delete('/tours/:id', tourController.removeOne)
router.put('/tours/:id', tourController.editOne)

module.exports = router