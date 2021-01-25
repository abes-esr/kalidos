const express = require('express');
const bodyParser = require('body-parser')
const f = require('./js/index');
const Lists = require('./js/Lists');

const res = Lists.setup()
const listCategorie = res[0]
const listType = res[1]


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
app.get('/rules', (req, res) => {
  const file = `${__dirname}/public/model_regles_tries.json`;
  res.download(file); // Set disposition and send it.
});

/**
 * remplace le contenu du fichier result.json par le body de la requete
 * @body body : fichier resultat
 * return code 200
 */
app.post('/result', (req, res) => {
  const json = JSON.stringify(req.body);
  fs.writeFile(`${__dirname}/public/result.json`, json, 'utf8', () => { });
  res.sendStatus(200);
});

/**
 * crée un fichier txt avc la liste des notices erronées
 * @body body : fichier resultat
 * return code 200
 */
app.post('/notice', (req, res) => {
  const json = req.body;
  const data_verif = Object.keys(json).map((key) => [Number(key), json[key]]);
  const listPPNWithError = data_verif.filter((row) => { return row[1].errors.length });

  let stream = fs.createWriteStream(`${__dirname}/public/noticesErreurs.txt`);

  stream.once('open', function(fd) {
    let str;
    for (let i = 0; i < listPPNWithError.length; i++) {
      str = listPPNWithError[i][1]['PPN'];
      stream.write(str + "\n");
    }
    stream.end();
  });

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


    console.log(rules[categorie][type]);

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
 * supression d'une regle
 * @header index : identifiant de la regle a supprimer
 * return 200 ou 404
 */
app.delete('/rules', (req, res) => {
  console.log("DELETE")
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
 * modification d'une regle
 * @header index : identifiant de la regle a modifier
 * @body body : nouvelle regle
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

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
  console.log(`App is running on : http://localhost:${port}`);
});


