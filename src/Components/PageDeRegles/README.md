# Points à savoir sur ce dossier

- Quand on parle de ``schema`` on fait référence aux objets JS qui génèrent les schémas de formulaires : [react-jsonschema-form](https://react-jsonschema-form.readthedocs.io/en/latest/)

- le fichier [generator.js](./generator.js) contient les fonctions à appeler pour la génération du champ regex dans les règles qu'ont besoin

- Le fichier [operators.js](./operators.js) contient les listes d'operateurs à appliquer par les règles avec leurs tags à afficher

- Le fichier [rules.js](./table/rules.js) contient la fonction de filtrage des règles recupérées de l'api pour créer une liste de règles

- Le fichier [types.js](./table/types.js) contient les spécifications pour la formalisation des types de règles et son affichage

- Le fichier [specifications.js](./table/specifications.js) contient les specifications pour la table de règles [react-bootstrap-table](https://react-bootstrap-table.github.io/react-bootstrap-table2/)

### Le dossier forms 

Contient les schémas et fonctions de formalisation de chaque type de règles. En plus:

- Le fichier [regex.js](./forms/regex.js) correspond à un schéma qui est souvent répété, qui génère le regex pour les règles matching, conditionnels matching et idref

- Le fichier [conditions.js](./forms/conditions.js) correspond à un schéma qui est souvent répété, qui génère la liste de conditions pour les règles precendence, conditionnels matching, conditionnels dependence et conditionnels structurel

## Creation de regex:

**Motif :** champ, zone, valeur qui servira d'evaluation. Ceci peut etre un 'mot' qui dans notre cas on considere une sequence d'au moins 2 caractères (espaces inclus), ou bien un seul caractere

Règles: 
* Doit contenir : La(Les) zone(s) doit(doivent) contenir les motifs soumis
* Ne doit pas contenir : La(Les) zone(s) ne doit(doivent) pas contenir les motifs soumis
* Égale à : La(Les) zone(s) doit(doivent) etre egal(egaux) aux motifs soumis
* Ne soit pas égale à : La(Les) zone(s) ne doit(doivent) pas etre egal(egaux) aux motifs soumis
* Commence par  : La(Les) zone(s) doit(doivent) commencer par les motifs soumis
* Ne doit pas commencer par : La(Les) zone(s) ne doit(doivent) commencer par les motifs soumis
* Finit par : La(Les) zone(s) doit(doivent) finir par les motifs soumis
* Ne doit pas finir par : La(Les) zone(s) ne doit(doivent) pas finir par les motifs soumis
* Nombre de caractères : La(Les) zone(s) doit(doivent) avoir exactement ce nombre de caractères

