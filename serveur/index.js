const express = require('express');
const bodyParser = require('body-parser')



const app = express();
const path = require('path');
const fs = require('fs');



const DIST_DIR = path.join(__dirname, '../dist');
app.use(bodyParser.json())
app.use(express.static(DIST_DIR));
const port = process.env.PORT || 3000;
const mockResponse = {
  foo: 'bar',
  bar: 'foo',
};

app.get('/rules', (req,res) => {
  const file = `${__dirname}/public/model_regles.json`;
  res.download(file); // Set disposition and send it.
});
app.post('/rules', (req,res) => {

  res.sendStatus(200);
  const json = JSON.stringify(req.body);
  fs.writeFile(`${__dirname}/public/result.json`, json, 'utf8' , () => {});
});

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
