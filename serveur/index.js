const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const f = require('./js/index');
const Lists = require('./js/Lists');
const favicon = require('serve-favicon')

const res = Lists.setup()
const listCategorie = res[0]
const listType = res[1]


const app = express();
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.join(__dirname, '../dist');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(express.static(DIST_DIR));
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const mockResponse = {
  foo: 'bar',
  bar: 'foo',
};


/**
 * Renvoie le fichier de règles.
 */
app.get('/rules', (req, res) => {
  const file = `${__dirname}/public/model_regles_tries.json`;
  res.download(file); // Set disposition and send it.
});

/**
 * Remplace le contenu du fichier result.json par le body de la requête.
 * @body body : fichier resultat
 * return code 200
 */
app.post('/result', (req, res) => {
  const json = JSON.stringify(req.body);
  fs.writeFile(`${__dirname}/public/result.json`, json, 'utf8', () => { });
  res.sendStatus(200);
});

/**
 * Ajoute une nouvelle règle dans le fichier de règles.
 * @header type : type de la règle
 * @header categorie : catégorie de la règle
 * retourne 200 si ajout avec succés
 * retourne 304 si on tente d'ajouter une règle déjà existante
 * retourne 404 si le type/catégorie n'existe pas
 */
app.post('/rules', (req, res) => {
  let json = fs.readFileSync(`${__dirname}/public/model_regles_tries.json`);
  let rules = JSON.parse(json);
  const type = req.header("type");
  const categorie = req.header("categorie");
  const index = f.idGenerator(rules)
  let valid = true;
  if (rules[categorie][type] != null) {
    rules[categorie][type].forEach(function (element) {
      if (f.ruleEquals(element, req.body)) {
        valid = false;
      }
    });

    if (valid) {
      let body = req.body
      body.index = index
      rules[categorie][type].push(body)
    }


    //console.log(rules[categorie][type]);

    const newJson = JSON.stringify(rules);
    fs.writeFile(`${__dirname}/public/model_regles_tries.json`, newJson, 'utf8', () => { });

    if (valid) {
      res.sendStatus(200);
    } else {
      res.sendStatus(304);
    }
  } else {
    res.sendStatus(404);
  }
});

/**
 * Supprime une règle.
 * @header index : identifiant de la règle à supprimer
 * return 200 ou 404
 */
app.delete('/rules', (req, res) => {
  //console.log("DELETE")
  let json = fs.readFileSync(`${__dirname}/public/model_regles_tries.json`);
  let rules = JSON.parse(json);
  const index = parseInt(req.header("index"), 10);
  for (categorie in listCategorie) {
    for (type in listType) {
      for (i = 0; i < rules[listCategorie[categorie]][listType[type]].length; i++) {
        if (rules[listCategorie[categorie]][listType[type]][i].index == index) {
          rules[listCategorie[categorie]][listType[type]].splice(i, 1);
          const newJson = JSON.stringify(rules);
          fs.writeFile(`${__dirname}/public/model_regles_tries.json`, newJson, 'utf8', () => { });
          res.sendStatus(200);
          return;
        }
      }
    }
  }
  res.sendStatus(404);
});

/**
 * Modifie une règle.
 * @header index : identifiant de la règle à modifier
 * @body body : nouvelle règle
 * return 200 ou 404
 */
app.put('/rules', (req, res) => {
  let json = fs.readFileSync(`${__dirname}/public/model_regles_tries.json`);
  let rules = JSON.parse(json);
  const index = parseInt(req.header("index"), 10);
  for (categorie in listCategorie) {
    for (type in listType) {
      for (i = 0; i < rules[listCategorie[categorie]][listType[type]].length; i++) {
        if (rules[listCategorie[categorie]][listType[type]][i].index === index) {
          rules[listCategorie[categorie]][listType[type]][i] = req.body;
          rules[listCategorie[categorie]][listType[type]][i].index = index;
          const newJson = JSON.stringify(rules);
          fs.writeFile(`${__dirname}/public/model_regles_tries.json`, newJson, 'utf8', () => { });
          res.sendStatus(200);
          return;
        }
      }
    }
  }
  res.sendStatus(404);

});

/**
 * Renvoie les notices erronées.
 */
app.get('/getNotices', (req, res) => {
  const file = `${__dirname}/public/noticesErreurs.json`;
  res.download(file); // Set disposition and send it.
});

/**
 * Ajoute une notice à la liste des notices erronées.
 * @body body : date de création qui fera office d'index de la notice
 * return code 200
 */
app.post('/notices', (req, res) => {
  const errorIndex = req.body;
  const datetime = moment().format('DD/MM/YYYY') + " " + moment().format('HH:mm:ss');
  fs.readFile(`${__dirname}/public/noticesErreurs.json`, 'utf8', function readFileCallback(err, data){
    if (err) {
        console.log(err);
    } else {
      let obj = JSON.parse(data);
      obj[datetime] = errorIndex;
      json = JSON.stringify(obj);
      fs.writeFile(`${__dirname}/public/noticesErreurs.json`, json, 'utf8', function(err, result) {
        if(err) console.log('error', err);
      });
    }
  });
  res.sendStatus(200);
});

/**
 * Supprime une notice.
 * @header index : identifiant de la notice à supprimer
 * return code 200
 */
app.delete('/notices', (req, res) => {
  const index = req.header("index");
  fs.readFile(`${__dirname}/public/noticesErreurs.json`, 'utf8', function readFileCallback(err, data){
    if (err) {
        console.log(err);
    } else {
      let obj = JSON.parse(data);
      delete obj[index];
      json = JSON.stringify(obj);
      fs.writeFile(`${__dirname}/public/noticesErreurs.json`, json, 'utf8', function(err, result) {
        if(err) console.log('error', err);
      });
    }
  });
  res.sendStatus(200);
});

/**
 * Supprime toutes les notices, réécrit un json vide.
 * return code 200
 */
app.delete('/deleteAllNotices', (req, res) => {
  fs.readFile(`${__dirname}/public/noticesErreurs.json`, 'utf8', function readFileCallback(err, data){
    if (err) {
        console.log(err);
    } else {
      let obj = {};
      json = JSON.stringify(obj);
      fs.writeFile(`${__dirname}/public/noticesErreurs.json`, json, 'utf8', function(err, result) {
        if(err) console.log('error', err);
      });
    }
  });
  res.sendStatus(200);
});

/**
 * URL DE TEST
 */
app.post('/testIdGenerator', (req, res) => {
  let json = fs.readFileSync(`${__dirname}/public/model_regles_tries.json`);
  let rules = JSON.parse(json);
  console.log(f.idGenerator(rules))
  res.sendStatus(200);
});

app.post('/upload', (req, res) => {
  res.sendStatus(200);
});


app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(port, HOST, () => {
  console.log(`App listening on port: ${port}`);
  console.log(`App is running on : http://localhost:${port}`);
});


