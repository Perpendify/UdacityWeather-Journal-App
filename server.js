// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express()

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

// Setup Server
const port = 8000;
const listening = () => {
    console.log( `server is running on localhost: ${port}`);
};

const server = app.listen(port, listening);

//GET function 

app.get('/allData', (req,res) => {
    res.send(projectData);
});


//POST function

app.post('/addData', (req,res) => {
    let data = req.body;
    console.log(data);
    newEntry = {
        date: data.date,
        temp: data.temp,
        feelings: data.feelings
    }
    projectData.push(newEntry);
}
);

