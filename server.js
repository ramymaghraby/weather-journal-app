// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

// Port

const port = 3000;

// Dependencies

const cors = require('cors');
const bodyParser = require('body-parser');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const server = app.listen(port, serverListner());

function serverListner() {
    console.log(`Server is up and listening on port ${port}`)
}

// GET Route

app.get('/all', (req, res) =>{
    res.send(projectData)
})

// POST Route
app.post('/all', (req, res)=>{
    projectData = req.body
})


