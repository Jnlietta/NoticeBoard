const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');


//start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

// add middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'xyz567', store: MongoStore.create(mongoose.connection) }));

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

 // connects our backend code with the database
 mongoose.connect('mongodb://0.0.0.0:27017/noticeBoardDB', { useNewUrlParser: true });
 const db = mongoose.connection;

 db.once('open', () => {
 console.log('Connected to the database');
 });
 db.on('error', err => console.log('Error ' + err));