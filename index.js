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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let date = Date.now();
    res.json({unix: date, utc: new Date(date).toString()});
});

app.get("/api/:date", function (req, res) {
  var miliseconds = Date.parse(req.params.date);
  if (!isNaN(miliseconds)) {
    let date = new Date(miliseconds);
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  } else if (parseInt(req.params.date) != null) {
    let mili = parseInt(req.params.date);
    let date = new Date(mili);
    if (!isNaN(date.getTime()))
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    else res.json({ error : "Invalid Date" });
  } else {
    res.json({ error : "Invalid Date" });
  }
  
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
