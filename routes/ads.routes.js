const express = require('express');
const router = express.Router();

const AdsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.get('/ads/search/:searchPhrase', AdsController.getBySearchPhrase);
router.post('/ads', imageUpload.single('photo'), AdsController.addNew);
router.put('/ads/:id', AdsController.editById);
router.delete('/ads/:id', AdsController.deleteById);

module.exports = router;