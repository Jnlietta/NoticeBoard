const express = require('express');
const cors = require('cors');

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
