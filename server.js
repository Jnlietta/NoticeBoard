const express = require('express');
const cors = require('cors');

const app = express();

// add middleware 
app.use(cors());
//app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(8000, () => {
console.log('Server is running on port: 8000');
});