const express = require('express');
const xml2js = require('xml2js');


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

var obj = JSON.parse(fs.readFileSync('model_regles.json', 'utf8'));

var parser = new xml2js.Parser();
let xml_string = fs.readFileSync("notice.xml", "utf8");

var leader;
var controlfields;
var datafields;


parser.parseString(xml_string, function(error, result) {
  if(error === null) {
    leader = result.record.leader;
    controlfields = result.record.controlfield ;
    datafields = result.record.datafield;
  }
  else {
    console.log(error);
  }
});


 // console.log(leader);
  //console.log(controlfields);
  //console.log(datafields);

obj.Generale.matching.forEach(function(regle) {
  const regex = RegExp(regle.regex);
  datafields.forEach(function (field){
       if(field['$'].tag == regle.Number){
         field.subfield.forEach(function (subfield){
              if(subfield['$'].code === regle.code && !regex.test(subfield._))
                 console.log(regle.message +" : "+  subfield._);
         });
       }
  });
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
