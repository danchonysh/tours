const router = require('express').Router()
const tourController = require('../controllers/tourController.js')

router.get('/tours', tourController.getMany)
router.post('/tours', tourController.addOne)
router.delete('/tours/:id', tourController.removeOne)
router.put('/tours/:id', tourController.editOne)

module.exports = router