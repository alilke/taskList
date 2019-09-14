console.log('hello from server');
//Imports express from node modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// make a PORT...
const PORT = process.env.PORT ||  5000;
//Make our app exist!
// USE THINGS
// Configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // This line is required for Angular
// Serve static files...
app.use(express.static('server/public'))
//SETUP ROUTES
const taskRouter = require('./routes/router.js');
app.use('/tasks', taskRouter);



// listen for calls --- Start server
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
  })

  
//routing