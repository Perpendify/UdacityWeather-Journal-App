// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express');

// Start up an instance of app
var app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

// Setup Server

const listening = () => {
    console.log( `server is running on localhost: ${port}`);
};

const server = app.listen(port, listening);

//GET function 

app.get('/allData', sendData);

function sendData(req,res) {
    res.send(projectData);
    projectData = [];
}


//POST function

app.post('/addData', addData);

function addData(req,res) {
    let data = req.body;
    console.log(data);
    newEntry = {
        date: data.date,
        temp: data.temp,
        feeling: data.feeling
    }
    projectData.push(newEntry);
}
