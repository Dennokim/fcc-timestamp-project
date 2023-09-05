// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get("/api/:date", (req, res) => {
  const dateInput = req.params.date;
  let response = {};

  // Try parsing the input as a date string
  const date = new Date(dateInput);

  if (!isNaN(date)) {
    response.unix = date.getTime();
    response.utc = date.toUTCString();
  } else {
    // Try parsing the input as a Unix timestamp
    const timestamp = parseInt(dateInput);

    if (!isNaN(timestamp)) {
      response.unix = timestamp;
      response.utc = new Date(timestamp).toUTCString();
    } else {
      // Handle invalid input
      response.error = "Invalid date";
    }
  }

  res.json(response);
});

app.get("/api", (req, res) => {
  const date = new Date();
  const response = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };

  res.json(response);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
