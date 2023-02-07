const express = require('express');
const http2Express = require('http2-express-bridge');
const http2 = require('http2');
const cors = require('cors');

//file-system
const fs = require('fs');
const path = require('path');

const app = http2Express(express);

// for fixing"Access - Control- Allow - Origin" Cors issue
app.use(cors());
// ##############################
app.use(express.static(__dirname + '/public'));

const port = 3010;

app.get('/', (req, res) => {
  var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  res.status(200).send(html);
});

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  allowHTTP1: false,
};

const server = http2.createSecureServer(options, app);
server.listen(port);
