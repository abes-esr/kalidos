# Points a savoir su ce dossier

- Quand on parle de ``schema`` on fait reference aux objets JS qui generent les schemas de formulaires : [react-jsonschema-form](https://react-jsonschema-form.readthedocs.io/en/latest/)

- le fichier [generator.js](./generator.js) contiens les fonctions a appeler pour la generation du champ regex dans les regles qu'ont besoin

- Le fichier [operators.js](./operators.js) contiens les listes d'operateurs a appliquer par les regles avec leurs tags a afficher

- Le fichier [rules.js](./table/rules.js) contiens la fonction de filtrage des regles recuperees de l'api pour creer une liste de regles

- Le fichier [types.js](./table/types.js) contiens les specifications pour la formalisation des types de regles et son affichage

- Le fichier [specifications.js](./table/specifications.js) contiens les specifications pour la table de regles [react-bootstrap-table](https://react-bootstrap-table.github.io/react-bootstrap-table2/)

### Le dossier forms 

Contiens les schemas et fonctions de formalisation de chaque type de regles. En plus:

- Le fichier [regex.js](./forms/regex.js) corresponds a un schema qui est souvent repete, qui genere le regex pour les regles matching, conditionnels matching et idref

- Le fichier [conditions.js](./forms/conditions.js) corresponds a un schema qui est souvent repete, qui genere la liste de conditions pour les regles precendence, conditionnels matching, conditionnels dependence et conditionnels structurel
