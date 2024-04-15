const Ads = require('../models/Ads.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ads.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const ads = await Ads.findById(req.params.id);
        if(!ads) res.status(404).json({ message: 'Not found' });
        else res.json(ads);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getBySearchPhrase = async (req, res) => {};
exports.addNew = async (req, res) => {};
exports.editById = async (req, res) => {};
exports.deleteById = async (req, res) => {};