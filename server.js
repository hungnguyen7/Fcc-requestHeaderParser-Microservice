// server.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

//Code here
const requestIp = require('request-ip');

// inside middleware handler
let ipMiddleware = (req, res, next)=>{
  const clientIp = requestIp.clientIp(req);
  next();
}
// register it as middleware
app.use(requestIp.mw());

app.get("/api/whoami", (req, res)=>{
  res.json({
    ipaddress: req.clientIp,
    language: req.acceptsLanguages()[0],
    software: req.get('user-agent')
  })
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
