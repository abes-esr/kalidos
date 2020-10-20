const express = require('express');
const bodyParser = require('body-parser')
const _ = require('lodash');
const idGenerator = require('./js/index');



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

/**
 * renvois le fichier de regles
 */
app.get('/rules', (req,res) => {
  const file = `${__dirname}/public/model_regles.json`;
  res.download(file); // Set disposition and send it.
});

/**
 * remplace le contenu du fichier result.json par le body de la requete
 * @body body : fichier resultat
 * return code 200
 */
app.post('/result', (req,res) => {
  const json = JSON.stringify(req.body);
  fs.writeFile(`${__dirname}/public/result.json`, json, 'utf8' , () => {});
  res.sendStatus(200);
});

/**
 * ajoute une nouvelle regle dans le fichier de regles
 * @header type : type de la regle
 * @header categorie : categorie de la regle
 * retourne 200 si ajout avec succes
 * retourne 304 si on tente d'ajouter une regle deja existante
 * retourne 404 si le type/categorie n'existe pas
 */
app.post('/rules', (req,res) => {
  let json = fs.readFileSync(`${__dirname}/public/model_regles.json`);
  let rules = JSON.parse(json);
  const type = req.header("type");
  const categorie = req.header("categorie");
  let valid = true;
  if(rules[categorie][type] != null) {
    rules[categorie][type].forEach(function(element){
      if(_.isEqual(element, req.body)){
        valid = false;
      }
    });

    if(valid) {
      rules[categorie][type].push(req.body)
    }


    console.log(rules[categorie][type]);

    const newJson = JSON.stringify(rules);
    fs.writeFile(`${__dirname}/public/model_regles.json`, newJson, 'utf8' , () => {});

    if(valid) {
      res.sendStatus(200);
    } else {
      res.sendStatus(304);
    }
  } else {
    res.sendStatus(404);
  }
});


app.post('/testIdGenerator', (req,res) => {
  let json = fs.readFileSync(`${__dirname}/public/model_regles.json`);
  console.log(idGenerator())
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
