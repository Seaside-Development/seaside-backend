//imports
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors=require('cors')

connectDB();

//enable express middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Enable CORS
app.use('/', cors())

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'frontend/public/css'));
app.use('/css', express.static(__dirname + 'frontend/public/js'));
app.use('/css', express.static(__dirname + 'frontend/public/attachments'));

//display the ejs files
app.get('', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/index.html')
})  //end of app.get

//api pathways
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/jobrequests', require('./routes/jobrequestsRoutes'));
app.use('/api/contractor', require('./routes/ContractorsRoutes'));
//pathway to the error
app.use(errorHandler);


// check that app is running on production mode
if (process.env.NODE_ENV === 'production') {
    //forces https on the website
    app.use(compression());
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.listen(port, () => console.log(`Server started on port ${port}`));