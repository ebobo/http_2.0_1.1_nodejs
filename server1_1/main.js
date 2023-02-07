const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//file-system
const fs = require('fs');
const path = require('path');

const app = express();
// for fixing"Access - Control- Allow - Origin" Cors issue
app.use(cors());
// ##############################
app.use(express.static(__dirname + '/public'));

const port = 3009;

app.get('/', (req, res) => {
  var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  res.status(200).send(html);
});

https
  .createServer(
    {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.crt'),
    },
    app
  )
  .listen(port, () => {
    console.log(`http 1.1 server listening on port ${port}`);
  });
