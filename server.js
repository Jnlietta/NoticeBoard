const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

//start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

// add middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files from react app
//app.use(express.static(path.join(__dirname, '/client/build')));

//add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/auth.routes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
  
app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});