# Explication de l'interface de Règles

[[_TOC_]]

Dans cette interface un utilisateur peut ajouter, modifier ou bien supprimer une règle, aussi il aura la possibilité de basculer vers une interface pour tester la véracité d'une règle.

Comme le montre la figure dans cette interface nous pouvons parcourir les règles qui existent par types de documents qui sont pour rappel : 
- ``Monographies imprimées et autres documents``
- ``Thèse et Mémoires (Soutenance)``
- ``Thèse et Mémoires (Reproduction)``
- ``Monographie électronique``
- ``Générale``. 

Ici chaque règle dispose d'une colonne `Vérification` qui correspond au message à afficher lorsque la règle est violée. Dans cette interface, l'utilisateur peut également rechercher une règle précise parmi les règles existantes, en entrant les mots clés dans la barre de recherche. 

![](https://i.ibb.co/341nHBB/c15.png)


# Explication d'ajout des règles 

Lorsque l'utilisateur clique sur `Ajouter une règle`, la fenêtre suivante apparait, où il devrai choisir le type de règle correspondant parmi les 10 types qui existent, et qui sont pour rappel : 


``Matching``, ``Dépendances``, ``Conditionnels Matching``, ``Conditionnels Dependance``, ``Conditionnels Structurel``, ``Structurels``, ``Références``, ``Ordonnancement``, ``Compte``, ``Precedence``. 

En effet chaque type aura son propre formulaire que nous détaillerons par la suite. En sélectionnant un type de règle, une description textuelle ainsi qu'une animation sous forme de GIF met en évidence cette règle et permet de donner une explication pour ce type de règle, et ceci afin de mieux guider l'utilisateur qui souhaite ajouter une nouvelle règle.

![](https://i.ibb.co/W0svYFj/C16.png)

En cliquant sur suivant l'utilisateur sera rediriger directement vers une fenêtre qui correspond au type choisi.  Il est a noter qu'une fois un formulaire d'ajout d'un type de règle complété, pour le sauvegarder l'utilisateur doit cliquer sur `Valider` et la fenêtre suivante s'affiche :

![](https://i.ibb.co/y0x5PXB/C19.png)

## Création de regex: 
Pour la suite les champs de la forme ![](https://ibb.co/4ZK93Dm) 

Ces trois champs : ``Règle à utiliser``, ``Le motif contiens de mots`` et ``Motif(s) à utiliser par la règle`` seront combinés pour générer le champ `regex` pour les règles de type [Matching, Référentiels, et Conditionnels Matching]
(./wikiRègles.md) 
**Motif :** champ, zone, valeur qui seront utilisés comme forme d'évaluation. Ceci peut être un **'mot'** qui dans notre cas nous considérons une séquence d'au moins 2 caractères (espaces inclus), ou bien un seul caractère, ou bien un nombre (comme dans le cas de la règle nombre de caractères). 
Exemples de mots : rameau, Tg, C (espace). 
Exemple de caractère seul : 9, a, c 

### Règle à utiliser 

La règle peut être de type : 
* Doit contenir : La (Les) zone(s) doit(doivent) contenir les motifs soumis 
* Ne doit pas contenir : La(Les) zone(s) ne doit(doivent) pas contenir les motifs soumis 
* Égale à : La(Les) zone(s) doit(doivent) être égal(égaux) aux motifs soumis 
* Ne soit pas égale à : La (Les) zone(s) ne doit(doivent) pas être égal(égaux) aux motifs soumis 
* Commence par : La(Les) zone(s) doit(doivent) commencer par les motifs soumis 
* Ne doit pas commencer par : La(Les) zone(s) ne doit(doivent) commencer par les motifs soumis 
* Fini par : La(Les) zone(s) doit(doivent) finir par les motifs soumis * Ne doit pas finir par : La(Les) zone(s) ne doit(doivent) pas finir par les motifs soumis 
* Nombre de caractères : La(Les) zone(s) doit(doivent) avoir exactement ce nombre de caractères (mettre le nombre de caractères dans la case ``Motif(s) à utiliser par la règle``)

# Type de règles

Nous allons maintenant expliquer pour chaque type de règle son formulaire correspondant.

## Compte

> Nous rappelons que ce type de règles vérifie que la **Zone**  combinée avec sa  **Sous Zone** d'un document doit être d'un autre document à **Zone** la d'un autre document qui est spécifiée dans `Numéro de zone qui servira de comparateur*`.
> Nous rappelons aussi par exemple : Si plusieurs Zones égales à '101' avec la Sous Zone 'd' , il doit y avoir autant de documents avec la zone '330'.

![](https://i.ibb.co/vYZFvDJ/compte.gif)


L'utilisateur choisit donc d'abord le type de documents parmi les 5 types existants dans `Type de documents`, il saisit ensuite la **Zone** et la **Sous Zone** du documents concerné, puis dans **Numéro de zone qui sert de comparateur***, il indique la zone du document sur lequel la vérification doit être faite. Enfin, il n'a plus qu'à ajouter un message à afficher en cas de violation de cette règle.

## Dépendance

> Nous rappelons que ce type de règles effectue une opération de comparaison entre deux champs d'un même document, ce type de règles s'intéresse à la valeur des **Sous Zones**.
> Nous rappelons l'exemple : les 4 premiers caractères du sous-champ (Zone$Sous Zone) 029\$b doivent être égaux au champ (Zone$Sous Zone) 328\$d .

![](https://i.ibb.co/wL0hR5c/dependences.gif)

L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite la **Zone** et la **Sous Zone** du premier datafieled, ensuite il précisera la plage de valeur à comparer dans **Position**, comme ici nous comparons les 4 premiers caractères, il a fallu préciser la position 0 puis la position 4 dans le XML. L'utilisateur va ensuite préciser la  **Zone** et la **Sous Zone** du deuxième datafieled, sans préciser la position une deuxième fois car souhaitons pour cette exemple vérifier une égalité en choisissant l'**opérateur**  `égale à`  parmi les opérateurs:

- ​    "Ne soit pas égale à",
- ​    "Plus grand que",
- ​    "Plus grand ou égal que",
- ​    "Plus petit que",
- ​    "Plus petit ou égal que"

Il ajoutera enfin un message à afficher en cas de violation de cette règle.

## Référentiel

> Nous rappelons que ce type de règle vérifie dans un document externe si le controlfield est valide ou pas.
> Nous rappelons l'exemple : S'il existe une 606\$y et que 606\$2 est égal a la chaine `rameau` alors il faudrait récupérer l'identifiant de la notice comprise dans le champ 606\$3 et chercher par la suite cette notice sur https://www.idref.fr/ppn.xml. Enfin sur cette notice externe le controlfield 008 doit commence par `Tg`

![](https://i.ibb.co/QKqmKxT/idref.gif)

L'utilisateur choisit donc d'abord le type de documents parmi les 5 types existants dans `Type de documents`, il saisit ensuite la **Zone** et la **Sous Zone** du document externe et précise s'il y'a une condition de *matching*. Puis il rajoute la deuxième condition (*condition d'existence*), en précisant la condition du *matching*. Ensuite l'utilisateur *crée une regex* qui correspond à la règle.

Dans la partie `Vérification`, l'utilisateur remplit le champ à vérifier dans la notice externe en précisant aussi la regex à utiliser.

Dans *Identifiant* il est question de préciser la **Zone** et la **Sous Zone** où l'identifiant de la notice externe doit être récupéré, suivi par le message à afficher en cas de violation de cette règle.

## Matching

> Nous rappelons que ce type de règles permet d'imposer une contrainte sur la chaîne de caractères d'une **Sous Zone** si elle existe.
> Nous rappelons l'exemple : Le champ (Zone$Sous Zone)  230\$a ne doit pas contenir 'Mo'

![](https://i.ibb.co/WPvv5xJ/matchingun.gif)

L'utilisateur choisit donc d'abord le type de documents parmi les 5 types existants dans `Type de documents`. Il choisit ensuite les quantités de champs (**datafields**) sur lesquels la vérification doit être opérée, dans cet exemple nous en choisirons un seul. Puis l'utilisateur saisit la **Zone** et la **Sous Zone** concernées de ce document et précise la règle à utiliser parmi :

![](https://i.ibb.co/RSdQhLW/c7.png)

Une fois cela fait, il précise si **le(s) motif(s) ont plusieurs caractères?**, il saisit par la suite les motifs concernés, suivis par le message à afficher en cas de violation de cette règle.

Comme il est également possible d’inclure plusieurs champs dans une même règle et plusieurs motifs à matcher. Par exemple : 700$4  et 701$4 ne doivent pas contenir les valeurs 020, 050, 060. Dans l'animation suivante nous mettons en évidence cela :

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


# Règles tenant en compte des conditions
-----------------------------------------
Les regles suivantes sont verifiées de cette forme: Les conditions remplises seront verifiées avant tout, une fois ces conditions sont valides, la verification de la regle est fait.

Les conditions ici peuvent être de ce types:

- ``Le champ est présent`` : verifie si le datafield est présent
- ``Le champ est absent`` : verifie si le datafield est absent

Exemple :  Condition de présence d’un champ : vérifie la présence du datafield *214* avec l’indice *2* égale à *2*, et d’un subfield de code *a*

![](https://i.ibb.co/ryKKXh3/C20.png)




- ``le champ est présent et il contient le texte`` : verifie si le datafield est présent et qu'il contient le texte
- ``Ne doit pas contenir`` : verifie si le datafield n'existe pas ou qu'il ne contient pas le texte

Exemple : Condition sur la contenance d’un texte : vérifie que le caractère a la position *10* du datafield *105$a* est égal a *0* *(entre 10 et 11 car 0 contient un seul caractère)*

![](https://i.ibb.co/c6Rsbhs/21.png)




- ``Commence par`` : verifie si le datafield existe et qu'il commence par le texte
- ``Ne doit pas commencer par`` : verifie si le datafield n'existe pas ou 

Exemple : Condition sur le commencement du texte : vérifie que la valeur de *856$5* commence par *692669902*

![](https://i.ibb.co/Hd1m2Z7/22.png)




- ``Égale à`` : verifie si le datafield existe et qu'il est strictement égal au texte
- ``Ne soit pas égale à`` : verifie si le datafield n'existe pas ou est différent du texte

Exemple : Condition sur l’égalité d’un texte : vérifie que la valeur de *328$z* soit égal à *“Reproduction de”*

![](https://i.ibb.co/gvMBDRn/23.png)




- ``Champ existant et sous chaine en partant de la fin est égal au texte `` : vérifie si le champ existe et que la sous-chaîne en partant de la fin est égale au texte

Exemple : Condition sur une sous-chaîne se trouvant à la fin de la chaîne de caractère : *105$a* *5e position en commençant par la fin = 1*

![](https://i.ibb.co/L0vc9ht/24.png)




## Précèdent

> Ce type de règle vérifie dans une **Zone** qu'une sous-zone est bien **précédée par une autre sous-zone**
> Nous rappelons l'exemple : si les champs 608\$a et 608\$2 avec la chaine de caractère *rameau*  à matcher alors 608\$a doit être précédé d’un 608\$3.

![](https://i.ibb.co/BNJLV7c/precedence.gif)

L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite la **Zone **et les **Sous Zone** concernées et qui correspondent aux conditions d'existence, ici nous avons choisi la **Zone 608 avec ses deux Sous Zones** `*a*` et `2` avec la chaine de caractère `*rameau*`. 

Dans précédé il précisera les deux sous zones, à savoir :

- Sous zone de départ ;
- Sous zone précédente

 Il finira par le message à afficher en cas de violation de cette règle.

## Conditionnel Dépendance

> Ce type de règle applique une règle de dépendance si les conditions données sont validées.
>
> Nous rappelons l'exemple: Si la **Zone** 225 existe avec indice 1=0 alors sa **Sous Zone** $a doit être différente est différent du champs 410$t.

![](https://i.ibb.co/Cm0DFWB/Condition-Dependance.gif)

L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite dans `Premier Champs` la **Zone **et/ou **Sous Zone** ainsi que la valeur des indices 1 et 2 concernées et qui correspondent aux conditions d'existence, puis dans `Deuxième Champs`  il saisira la **Zone **et/ou **Sous Zone**, il précisera ensuite l'indice concerné et l'opérateur du matching choisi parmi : 

![](https://i.ibb.co/BPqwmxK/C18.png)


Enfin l'utilisateur indique le message à afficher en cas de violation de cette règle.

## Conditionnel Matching

> Ce type de règle applique une règle de matching si les conditions sont validées, de plus nous pouvons imposer la présence d'un champ.

![](https://i.ibb.co/9Wnj9Tj/Cond-Match.gif)

L'utilisateur va donc dans un premier temps choisir le type de documents parmi les 5 types existants dans `Type de documents`, Il saisira ensuite dans `Conditions` il précisera les conditions de départ à savoir :

- **Zone**
- **Sous Zone** 
- **Opérateur de matching**
- **Texte à vérifier** 

Dans Zone il précisera les numéro des zones à traiter en y ajoutant les règles de types matching à évaluer pour chaque zone, et ceci en mettant :

- **Numéro de la Zone**
- **Numéro de la Sous Zone** 
- **Règle à utiliser**
- **Motifs à traiter** 
- **Champ permettant d'indiquer si la Sous Zone doit être présente ou pas**
- **Message à afficher en cas de violation** 

Enfin,il précisera le type de matching à savoir :

- **Type** = `Tous Obligatoires` pour spécifier que tous les motifs doivent être validés 
- **Type** = `Un` pour préciser qu’au moins un motif doit être validé

Puis le message à afficher en cas de violation de cette règle.

## Conditionnel Structurel

> Ce type de règles applique une règle de type structurelle si les conditions sont validées. Ces règles de structures peuvent être appliquées soit sur le PPN en cours de traitement, soit sur un autre PPN (réciproque).
> Nous rappelons l'exemple : Si la zone 456 existe, alors vérifier que la notice en 456$0 contient une zone 455 avec liens réciproques

![](https://i.ibb.co/PzP6bJK/Cond-Struct.gif)

L'utilisateur choisit donc d'abord le type de documents parmi les 5 types existants dans `Type de documents`. Il saisit ensuite dans `Conditions` les conditions de départ à savoir :

- **Zone **
- **Sous Zone** 
- **Opérateur de matching**
- **Indice 1 de la zone (datafield)**
- **Indice 2 de la zone (datafield)**

Dans Zone il précise le numéro de zone à traiter en y ajoutant les valeurs à évaluer pour cette zone, et ceci en mettant :

- **Numéro de la Zone **
- **Numéro de la Sous Zone** 
- **Indice 1 de la zone (datafield)**
- **Indice 2 de la zone (datafield)**
- **Un précision pour indique si la règle est réciproque ou pas **
- **Une précision pour indiquer si le champs doit être présent ou pas** 

Dans `Réciprocité` , l'utilisateur précise  la **Zone **et la **Sous Zone** du datafield réciproque puis le type du champs à savoir :

- **Type** = `Tous Obligatoires` pour spécifier que tous les motifs doivent être validés 
- **Type** = `Un` pour préciser qu’au moins un motif doit être validé

Et enfin le message à afficher en cas de violation de cette règle.

 

# Explication de modification d'une règle

Dans cette interface un utilisateur pourra modifier une règle existante, comme le montre l'animation suivante ceci ce fait en cliquant sur le bouton pour `modifier le contenu de la règle` ,  qui va rediriger l'utilisateur vers une fenêtre d'édition des règles qui est identique à celle de l'ajout d'une règle, sans changement de la catégorie de cette dernière, si besoin d'éditer la catégorie ou le type d'une règle il faudrait la supprimer et la recréer de nouveau.

![](https://i.ibb.co/FwV2mhh/modification.gif)

Il suffit de suivre les même principes d'ajout d'une règle décrits dans la partie **Explication d'ajout des règles** , pour pouvoir modifier une règle donnée.



# Explication de suppression d'une règle

Dans cette interface un utilisateur pourra supprimer une règle existante, comme le montre l'animation suivante ceci se fait en cliquant sur le bouton `Supprimer la règle`, qui va rediriger l'utilisateur vers une fenêtre de confirmation de l'action de suppression, car en effet il s'agit de la suppression finale d'une règle.

![](https://i.ibb.co/6wk12g2/suppression.gif)



# Explication de test d'un règle

Dans cette interface un utilisateur pourra tester une règle existante, comme le montre l'animation suivante, l'utilisateur aura en entrée à gauche un PPN à tester, puis en appuyant sur le bouton `Tester la règle` , il sera informer si la règle est passé sur ce PPN ou pas.

![](https://i.ibb.co/tZFBnm1/test.gif)

