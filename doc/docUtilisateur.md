## Saisie des identifiant

Dans la page de saisie des identifiants l'utilisateur sélectionne un jeu de règles et choisit les PPN qu'il souhaite tester.

L'application doit vérifier un ensemble de critères sur la qualité d'un PPN, pour se faire elle dispose d'un ensemble de jeux de règles. Il est donc d'abord demandé à l'utilisateur de choisir un jeu de règles parmi les types suivants :
- `Générale`, qui s'applique pour tout type de document
- `MémoireSoutenance` pour les règles de type `Th-Mémoires (version soutenance)`
- `MémoireReproduction` pour les règles de type `Th-mémoires (reproduction)`
- `Electronique` pour les règles de type `Monographie électronique`
- `AutreDocuments` pour les règles de type `Monographies imprimées et autres documents`

Ensuite, l'utilisateur indique les PPN qu'il souhaite tester. Pour se faire il dispose de deux options :
- saisir les PPN un par un dans le grand champ de texte en veillant à n'en avoir qu'un seul par ligne
- glisser un fichier texte (.txt) dans le grand champ de texte

Une fois ces étapes validées, l'utilisateur n'a plus qu'à cliquer sur le bouton `envoyer`, l'application se charge ensuite de tester les PPN choisis.

## Interface de vérification

Une fois les PPN envoyées à l'application, celle-ci les teste puis affiche les résultats dans l'interface de vérification. Le traitement des PPN peut se réveler long, aussi faut-il parfois attendre quelques secondes avant que l'affichage des résultats se termine.

Premièrement, l'entête de la page indique 
- le `nombre de PPN testés`
- le `nombre total d'erreurs`
- et le `nombre de PPN inexistants`

Ensuite, la page se divise en deux parties :
- À gauche se trouve la liste des PPN qui se sont révélés être erronés suite au test, un badge rouge indique le nombre d'erreurs trouvés dans chacun des PPN de la liste. Il est également possible de rechercher un PPN directement via une barre de recherche. Ces PPN sont sélectionnables, ce qui permet d'intéragir avec la partie droite de la page.
- À droite, un tableau récapitule les erreurs trouvées dans le PPN que l'on sélectionne à gauche, avec le message, la zone et la sous-zone de chacunes de ces erreurs.

Enfin, deux boutons verts situés à droite du titre de la page permettent de télécharger deux rapports excel de ces tests.
- Le premier propose un descriptif complet des tests réalisés sur les PPN, on y trouve pour chaque PPN l'ensemble des erreurs trouvées avec leurs messages et leurs codes.
- Le second rapport dispose toutes les erreurs possibles dans l'entête du fichier excel et les PPN testés en tant que colonnes. Pour chaque PPN, on coche les erreurs correspondantes.

## Historique
