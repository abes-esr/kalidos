# Explication de l'interface de Règles

Dans cette interface un utilisateur peut ajouter, modifier ou bien supprimer une règle, aussi il aura la possibilité de basculer vers une interface pour tester la véracité d'une règle.

Comme le montre la figure dans cette interface nous pouvons parcourir les règles qui existent par type de documents qui sont pour rappelle : ``Monographies imprimées et autres documents``, ``Thèse et Mémoires (Soutenance)``, ``Thèse et Mémoires (Reproduction)``, ``Monographie électronique`` et ``Générale``. Ici chaque règle aura une colonne `Vérification` qui correspond au message à afficher lorsque la règle est violée. Dans cette interface l'utilisateur a aussi la possibilité de rechercher une règle précise parmi les règles existantes, en entrant les mots clés dans la barre de recherche. 

![](https://i.ibb.co/341nHBB/c15.png)



Lorsque l'utilisateur clique sur `Ajouter une règle`, la fenêtre suivante apparait, où il devrai choisir le type de règle correspondant parmi les 10 types qui existent, et qui sont pour rappel : 


``Matching``, ``Dépendances``, ``Conditionnels Matching``, ``Conditionnels Dependance``, ``Conditionnels Structurel``, ``Structurels``, ``Références``, ``Ordonnancement``, ``Compte``, ``Precedence``. 

En effet chaque type aura son propre formulaire que nous détaillerons par la suite. En sélectionnant un type de règle, une description textuelle ainsi qu'une animation sous forme de GIF met en évidence cette règle et permet de donner une explication pour ce type de règle, et ceci afin de mieux guider l'utilisateur qui souhaite ajouter une nouvelle règle.

![](https://i.ibb.co/W0svYFj/C16.png)

En cliquant sur suivant l'utilisateur sera rediriger directement vers une fenêtre qui correspond au type choisi. Nous allons maintenant expliquer pour chaque type de règle son formulaire correspondant.

## Compte

> Nous rappelons que ce type de règle vérifie que la **Zone**  combiner avec sa  **Sous Zone** d'un document doit être d'un autre document à **Zone** la d'un autre document qui est spécifiée dans `Numéro de zone qui servira de comparateur*`.
> Nous rappelons aussi par exemple : Si plusieurs Zone égale à '101' avec la Sous Zone 'd' , il doit y avoir autant de  document avec la zone '330'.

![](https://i.ibb.co/vYZFvDJ/compte.gif)



L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite la **Zone** et la **Sous Zone** du documents concerné, puis dans **Numéro de zone qui servira de comparateur*** il saisira la zone du document sur lequel la vérification doit être faite. Il ajoutera enfin un message à afficher en cas de violation de cette règle.

## Dépendance

> Nous rappelons que ce type de règle effectue une opération de comparaison entre deux champs d'un même document, ce type de règle s'intéresse a la valeur des **Sous Zone**.
> Nous rappelons l'exemple : les 4 premiers caractères du sous champ (Zone$Sous Zone) 029\$b doivent être égaux au champ (Zone$Sous Zone) 328\$d .

![](https://i.ibb.co/wL0hR5c/dependences.gif)

L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite la **Zone** et la **Sous Zone** du premier datafieled, ensuite il précisera la plage de valeur à comparer dans **Position**, comme ici nous comparons les 4 premiers caractères, il a fallu préciser la position 0 puis la position 4 dans le XML. L'utilisateur va ensuite préciser la  **Zone** et la **Sous Zone** du deuxième datafieled, sans préciser la position une deuxième fois car souhaitons pour cette exemple vérifier une égalité en choisissant l'**opérateur**  `égale à`  parmi les opérateurs:

- ​    "Ne soit pas égale à",
- ​    "Plus grand que",
- ​    "Plus grand ou égal que",
- ​    "Plus petit que",
- ​    "Plus petit ou égal que"

Il ajoutera enfin un message à afficher en cas de violation de cette règle.

## IdRef

> Nous rappelons que ce type de règle vérifie dans un document externe si le controlfield est valide ou pas.
> Nous rappelons l'exemple : S'il existe une 606\$y et que 606\$2 est égal a la chaine `rameau` alors il faudrait récupérer l'identifiant de la notice comprise dans le champ 606\$3 et chercher par la suite cette notice sur https://www.idref.fr/ppn.xml. Enfin sur cette notice externe le controlfield 008 doit commence par `Tg`

![](https://i.ibb.co/QKqmKxT/idref.gif)

L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite la **Zone** et la **Sous Zone** du document externe, puis il précisera s'il y'a une condition de *matching*, il rajoutera ensuite la deuxième condition (*condition d'existence*), en précisant la condition du *matching*, puis l'utilisateur *créera une regex* qui correspond à la règle.

Dans la partie `Vérification` l'utilisateur va remplir le champ à vérifier dans la notice externe en précisant aussi la regex a utiliser.

Dans *Identifiant* il est question de préciser la **Zone** et la **Sous Zone** où l'identifiant de la notice externe doit être récupérer, suivit par le message à afficher en cas de violation de cette règle.

## Matching

>Nous rappelons que ce type de règle permet d'imposer une contrainte sur la chaine de caractère d'une **Sous Zone** si elle existe
>Nous rappelons l'exemple : Le champ (Zone$Sous Zone)  230\$a ne doit pas contenir 'Mo'

![](https://i.ibb.co/WPvv5xJ/matchingun.gif)

L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il choisira ensuite les quantité de champs (**datafields**) sur les quels la vérification doit être faite, dans cet exemple nous choisirons un seul. L'utilisateur saisira ensuite la **Zone** et la **Sous Zone** concernés de ce document. Il précisera ensuite la règle à utiliser parmi :

![](https://i.ibb.co/RSdQhLW/c7.png)

Une fois cela fait, il précisera si **le(s) motif(s) ont plusieurs caractères?**, il saisira par la suite les motifs concernés, suivit par le message à afficher en cas de violation de cette règle.



Comme il est également possible d’inclure plusieurs champs dans une même règle et plusieurs motifs à matcher. Par exemple : 700$4  et 701$4 ne doivent pas contenir les valeurs 020, 050, 060. Et dans l'animation suivante nous mettrons en évidence cela :

  ![](https://i.ibb.co/K5kpjM0/matchingplusieurs.gif)



## Ordonnancement

> Nous rappelons que ce type de règle vérifie l'ordonnancement de toutes les **Zone** possédant le même identifiant, en effet il faut qu'elles soient triées en fonction de leur indice (1 ou 2).
> Nous rappelons l'exemple : Si plusieurs zones sont égale à 214, alors elles doivent respecter l'ordre des chiffres de l'indice 2

![](https://i.ibb.co/JHX6X1k/ordonnancement.gif)

L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite la **Zone** concernées de ce document. Il précisera ensuite l'ordre à respecter à savoir par :

![](https://i.ibb.co/c6pGp4Y/c14.png)

Il finira par le message à afficher en cas de violation de cette règle.

## Structurel

> Nous rappelons que ce type de règle impose des contraintes sur la structure du document
> Nous rappelons l'exemple : La **Zone** '328' doit contenir ind1=" "  et ind2="0"

![](https://i.ibb.co/mD4Qt1g/structurel1.gif)



L'utilisateur commencera par choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite la **Zone**  **Sous Zone** concernées de ce document. Il précisera ensuite les deux indices que doit contenir ce document, en précisant la valeur du type de la contrainte à savoir :

![](https://i.ibb.co/K7Hx7B3/C11.png)

Si le type de contrainte est une valeur obligatoire, il devra alors préciser cette valeur, il finira par le message à afficher en cas de violation de cette règle.


## Precede

> Verifie dans un datafield qu'une sous-zone est bien precedé par une autre sous-zone
> Exemple : 608\$a et 608\$2rameau, 608\$a doit être précédé d’un 608\$3



## ConditionDependance

> Applique une règle de dépence si les conditions sont validées



## ConditionMatching

> Applique une regle de matching si les conditions sont validées, de plus on peut imposer la présence d'un champ.



Le champ ``type`` peut contenir deux valeurs :

- La valeur ``allRequired`` indiquant que tous les tests dans values doivent réussir
- La valeur ``oneRequired`` indiquant qu'il faut au moins que l'un des test présent dans values réussisse

## ConditionStructurel

> Applique une règle de type structurelle si les conditions sont validées. Ces règles de structures peuvent être appliqués soit sur le PPN en cours de traitement, soit sur un autre PPN (réciproque)
> Exemple : Si le datafield 225 possède un indice 1 qui a une valeur à 0, alors il faut un datafield 410



 