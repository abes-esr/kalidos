const express = require('express');

const app = express();
const path = require('path');

const fs = require('fs');  

const DIST_DIR = path.join(__dirname, '../dist');

app.use(express.static(DIST_DIR));
const port = process.env.PORT || 3000;
const mockResponse = {
  foo: 'bar',
  bar: 'foo',
};

app.post('/upload', (req,res) => {
  res.sendStatus(200);
});

app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(DIST_DIR,'index.html'));
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
  console.log(`App is running on : http://localhost:${port}`);
});
