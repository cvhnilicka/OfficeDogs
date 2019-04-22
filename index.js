const express = require("express");
const bp = require("body-parser");
const path = require("path");

// env variables
const port = process.env.PORT || 8080;



var app = express();  // server


// configure the express server
app.use(bp.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bp.json()); // parse application/json
app.use(bp.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json


// Data persistance and model
var Dog = require("./models/dogModel")("dogs.json")

// Routing
var dogRouter = require("./routers/dogRouter")(Dog)

// set up the dog endpoint
app.use("/api/dogs", dogRouter);

app.listen(port, function(){
    console.log("Server running on port: " + port);
})
