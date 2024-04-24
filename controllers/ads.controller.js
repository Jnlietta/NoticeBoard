const Ads = require('../models/Ads.model');
const sanitize = require('mongo-sanitize');

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

exports.getBySearchPhrase = async (req, res) => {
    try {
        const searchPhrase = req.params.searchPhrase;
        const ads = await Ads.find({ title: { $regex: searchPhrase, $options: 'i' }});
        res.json(ads);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.addNew = async (req, res) => {
    try {
        const { title, content, date, photo, price, location, seller } = req.body;

        const sanitizedTitle = sanitize(title);
        const sanitizedContent = sanitize(content);
        const sanitizedDate = sanitize(date);
        const sanitizedPhoto = sanitize(photo);
        const sanitizedPrice = sanitize(price);
        const sanitizedLocation = sanitize(location);
        const sanitizedSeller = sanitize(seller);
  
        const newAds = await Ads.create({ 
          title: sanitizedTitle, 
          content: sanitizedContent, 
          date: sanitizedDate, 
          photo: sanitizedPhoto,
          price: sanitizedPrice, 
          location: sanitizedLocation, 
          seller: sanitizedSeller
        });

        res.status(201).send({ message: 'Advert created: ' + newAds.title });
        
      } 
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.editById = async (req, res) => {
    const { title, content, date, photo, price, location, seller } = req.body;

    const sanitizedTitle = sanitize(title);
    const sanitizedContent = sanitize(content);
    const sanitizedDate = sanitize(date);
    const sanitizedPhoto = sanitize(photo);
    const sanitizedPrice = sanitize(price);
    const sanitizedLocation = sanitize(location);
    const sanitizedSeller = sanitize(seller);

    try {    
      const ubdatedAds = await Ads.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: { 
            title: sanitizedTitle, 
            content: sanitizedContent, 
            date: sanitizedDate, 
            photo: sanitizedPhoto,
            price: sanitizedPrice, 
            location: sanitizedLocation, 
            seller: sanitizedSeller  
         }},
        { new: true }
      );
      if(ubdatedAds) {
        res.json(ubdatedAds);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id; 
    
        // Remove all data from id
        const deletedAds = await Ads.findOneAndDelete({ _id: id });
        if(deletedAds) {
            res.json({ message: 'Advertisement has been deleted' });
          }
          else res.status(404).json({ message: 'Not found...' });
        
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};