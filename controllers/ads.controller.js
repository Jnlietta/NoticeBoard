const Ads = require('../models/Ads.model');
const sanitize = require('mongo-sanitize');
const getImageFileType = require('../utils/getImageFileType');
const deleteFile = require('../utils/deleteFile');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ads.find().populate('seller'));
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const ads = await Ads.findById(req.params.id).populate('seller');
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
        const ads = await Ads.find({ title: { $regex: searchPhrase, $options: 'i' }}).populate('seller');
        res.json(ads);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.addNew = async (req, res) => {
    try {
        const { title, content, date, price, location, seller } = req.body;

        const sanitizedTitle = sanitize(title);
        const sanitizedContent = sanitize(content);
        const sanitizedDate = sanitize(date);
        const sanitizedPrice = sanitize(price);
        const sanitizedLocation = sanitize(location);
        const sanitizedSeller = sanitize(seller);
  
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        const photo = req.file.filename;

        if(sanitizedTitle && typeof sanitizedTitle === 'string' && sanitizedContent && typeof sanitizedContent == 'string' &&
          sanitizedDate && typeof sanitizedDate === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
          sanitizedPrice && typeof sanitizedPrice === 'string' && sanitizedLocation && typeof sanitizedLocation === 'string' && 
          sanitizedSeller && typeof sanitizedSeller == 'string') {
          
          const newAds = await Ads.create({ 
            title: sanitizedTitle, 
            content: sanitizedContent, 
            date: sanitizedDate, 
            photo: photo,
            price: sanitizedPrice, 
            location: sanitizedLocation, 
            seller: sanitizedSeller
          });

          res.status(201).send({ message: 'Advert created: ' + newAds.title });
          
        } else {
          deleteFile(req.file.path);
          res.status(400).send({ message: 'Bad request' });
        }
      } 
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.editById = async (req, res) => {
  try { 
    const { title, content, date, price, location, seller } = req.body;

    const sanitizedTitle = sanitize(title);
    const sanitizedContent = sanitize(content);
    const sanitizedDate = sanitize(date);
    const sanitizedPrice = sanitize(price);
    const sanitizedLocation = sanitize(location);
    const sanitizedSeller = sanitize(seller);

    const fileType = req.file ? await getImageFileType(req.file) : null;
    const photoPath = req.file?.filename;
       
    //  check if data fron form is correct
    if(sanitizedTitle && typeof sanitizedTitle === 'string' && sanitizedContent && typeof sanitizedContent == 'string' &&
        sanitizedDate && typeof sanitizedDate === 'string' && (!req.file || (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType))) &&
        sanitizedPrice && typeof sanitizedPrice === 'string' && sanitizedLocation && typeof sanitizedLocation === 'string' && 
        sanitizedSeller && typeof sanitizedSeller == 'string') {

      const ubdatedAds = await Ads.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: { 
            title: sanitizedTitle, 
            content: sanitizedContent, 
            date: sanitizedDate, 
            ...(photoPath && { photo: photoPath }),
            price: sanitizedPrice, 
            location: sanitizedLocation, 
            seller: sanitizedSeller  
        }},
        { new: true }
      );

      if(ubdatedAds) {
        // check if it is new file
        if(req.file){
          // find previous photo file and delete
          const existingAdvertisement = await Ads.findById(req.params.id);
          deleteFile(`public/uploads/${existingAdvertisement.photo}`);
        }

        res.json(ubdatedAds);
      }
      else res.status(404).json({ message: 'Not found...' });

    } else {
      deleteFile(req.file.path);
      res.status(400).send({ message: 'Bad request' });
    }

  }
  catch(err) {
    console.log(err)
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