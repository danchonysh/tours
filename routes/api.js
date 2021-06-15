const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController.js')

router.get('/tours', apiController.getTours)
router.get('/tours/:id', apiController.getTour)
router.post('/tours', apiController.addTour)
router.delete('/tours/:id', apiController.removeTour)
router.put('/tours/:id', apiController.editTour)

module.exports = router