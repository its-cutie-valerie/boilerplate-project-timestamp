// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

// Timestamp API endpoint
app.get('/api/:date', function (req, res) {
  let dateString = req.params.date;
  
  // Check if the date is a number (Unix timestamp) or a date string
  let date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);

  // If the date is invalid, return error
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  // Return the Unix and UTC time
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Handle empty /api endpoint to return current time
app.get('/api', function (req, res) {
  let currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
