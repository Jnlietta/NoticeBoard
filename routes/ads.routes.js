const express = require('express');
const router = express.Router();

const AdsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/authMiddleware');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.get('/ads/search/:searchPhrase', AdsController.getBySearchPhrase);
router.post('/ads', authMiddleware, imageUpload.single('photo'), AdsController.addNew);
router.put('/ads/:id', authMiddleware, imageUpload.single('photo'), AdsController.editById);
router.delete('/ads/:id', authMiddleware, AdsController.deleteById);

module.exports = router;