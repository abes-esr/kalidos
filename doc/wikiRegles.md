# Explication du jeu de règles de l'application Kalidos

[[_TOC_]]

## Exemple de PPN

Cet application traite des PPN qui sont au format xml , il est important de comprendre les principaux elements pour les regles a venir :
- les controlfields : sont des zones de textes qui sont identifié par leur **tag**, un controlfield est **unique**
- les datafield : contiennent des sous-zones qui sont identifié par leur **tag** , leur **ind1** et leur **ind2**, on peut avoir plusieurs fois le meme datafield dans un meme document
    - les sous-zones sont identifié par leur **code**, il est possible d'avoir plusieurs fois la meme sous zone dans un meme datafield


```xml
<record>
   <leader> nlm0 22 450 </leader>
   <controlfield tag="001">exemple controlfield</controlfield>
   <controlfield tag="002">exemple controlfield 2</controlfield>
   <datafield tag="100" ind1=" " ind2=" ">
       <subfield code="a">exemple subfield</subfield>
   </datafield>
   <datafield tag="101" ind1=" " ind2=" ">
       <subfield code="a">exemple subfield 2</subfield>
   </datafield>
</record>
```

### Notation 

Dans la suite du document on pourra retrouver des notations du type XXX$Y.
Cela signifie qu'on s'intéresse au datafield XXX et à son subfield Y

## Explication rapide du jeu de règle

L'application doit vérifier un ensemble de critères sur la qualité d'un PPN. Pour ce faire elle dispose d'un ensemble jeux de règles se trouvant sur le serveur au chemin suivant : `/serveur/public/model_regles_tries.json`

Actuellement, il existe 5 types de jeu règles, le jeu de règle ``Générale`` qui s'applique sur tous les types de documents. Puis un jeu de règle par type de document :
- ``MémoireSoutenance`` pour les règles de type ``Th-Mémoires (version soutenance)``
- ``MémoireReproduction`` pour les règles de type ``Th-mémoires (reproduction)``
- ``Electronique`` pour les règles de type ``Monographie électronique``
- ``AutreDocuments`` pour les règles de type ``Monographies imprimées et autres documents``

Chacun des jeux de règles est composé d'un même ensemble de types de règles. Chacun de ces types de règle aura une architecture de règle qui lui sera propre, et qui sera utile lors de la vérification des PPN.

On retrouve 10 types de règles différents : 
- ``Compte`` : Vérifie que le nombre de sous-zone d'un datafield soit égale au nombre d'un autre datafield
- ``Dependance`` : Vérifie l'égalité ou compare la valeur de deux champs contenue dans un même PPN
- ``IdRef`` : Verifie dans un document externe si le controlfield est valide
- ``Matching`` : Vérifie si une sous-zone correspond au regex fourni dans la règle
- ``Ordonnancement`` : Vérifie qu'une liste de datafield ayant le même tag, soit triée par indice
- ``Precede`` : Vérifie dans un même datafield, qu'une sous-zone est bien précédé par une autre sous-zone
- ``Structurel``: Vérifie la présence de datafield, sous-zone ou d'indice
- ``ConditionDependance`` : Applique une vérification de dépendance si les conditions sont respectées
- ``ConditionMatching``: Applique une vérification de matching si les conditions sont respectées 
- ``ConditionStructurel`` : Applique une vérification structurel si les conditions sont respéctées


## Compte

> Ce type de regle vérifie que le nombre de **datafield** est egal au nombre de **subfield** d'un autre **datafield**.
Par exemple : Si plusieurs 101$d, il doit y avoir autant de 330

```json
{
    "number": "101", # Numéro du datafield à vérifier
    "code": "d", # Code de la sous-zone à vérifier
    "contrainte": "330", # Numéro du datafield qui servira de comparateur
    "message": "Mention de résumé incohérente : vérifier zones 101 et le nombre de zones 330", # Message a afficher en cas de violation de la regle
    "index": 75 # Identifiant unique de la regle
}
```


## Dependance

> Ce type de régle effectue une opération de comparaison entre deux champs d'un meme document, ce type de regle s'intéresse a la valeur des **subfield** 
Exemple : le les 4 premiers caracteres du sous champ 029\$b doivent etre egaux au champ 328\$d
```json
 {
    "field1": {  
        "number": "029" # Numéro du premier datafield
        "code": "b", # Code du subfield à vérifier
        "pos": [ # Sous-chaîne à prélever dans le subfield
            0,
            4
        ],
    },
    "field2": {
        "number": "328" # Numéro du second datafield
        "code": "d", # Code du subfield à vérifier
        "pos": [], # Sous chaine a prélever dans le subfield
    },
    "operator": "equals", # Opérateur à appliquer 
    "message": "Année de soutenance : l'année en 029 et 328 doivent être identiques", # Message a afficher en cas de violation 
    "index": 76 # Identifiant unique de la regle
}
```

Liste des operator disponibles : 
- ``equals`` : ==
- ``not_equals`` : !=
- ``greater`` : > 
- ``lesser`` : <
- ``greaterEquals`` : >=
- ``lesserEquals`` : >=

Pour le paramètre pos, s'il contient une liste vide, alors toute la chaîne est conservée.

## IdRef
> Verifie dans un document externe si le controlfield est valide
Exemple : Si il existe une 606\$y et que 606\$2 est egal a la chaine `rameau` alors on recupere l'identifiant de la notice comprise dans le champ 606\$3 et on vas chercher cette notice sur https://www.idref.fr/ppn.xml. Puis sur cette notice externe on verifie que le controlfield 008 commence par `Tg`
```json
{
    "condition": [
        {
            "number": "606", # Numéro de la première condition
            "code": "y" # Code de la premiere condition
        },
        {
            "number": "606", # Numéro de la seconde condition
            "code": "2", # Code de la seconde condition
            "regex": "^rameau$" # Regex que doit vérifier la valeur du champ
        }
    ],
    "verification": {
        "number": "008", # Numéro du champ à vérifier dans la notice externe
        "regex": "^Tg.*" # Regex que doit vérifier la valeur du champ dans la notice externe
    },
    "identifiant": {
        "number": "606", # Numéro du datafield où recuperer l'identifiant de la notice externe
        "code": "3" # Code du subfield où recuperer l'identifiant de la notice externe
    },
    "message": "Incohérence indexation : vérifier que la zone 6XX est liée à une autorité RAMEAU",# Message à afficher en cas de violation
    "index": 325 # Identifiant unique de la règle
},
```
## Matching
>Permet d'imposer une contrainte sur la chaine de caractère d'un subfield s'il existe
Par exemple : 230\$a ne doit pas contenir Mo
```json
{
    "number": 230, # Numéro du datafield à vérifier
    "code": "a", # Code du subfield à vérifier
    "regex": "(?:(?!Mo).)+", # Regex que doit vérifier la valeur du champ
    "message": "Zone 230 : corriger le poids en Mo", # Message à afficher en cas de violation
    "index": 39 # Identifiant unique de la règle
},
```

> Il est egalement possible d'inclure plusieurs datafield dans une meme regle et plusieurs pattern a matcher
Par exemple : 7XX\$4 ne doit pas contenir les valeurs 020, 050, 060 , ...

```json
{
    "number": [ # Liste des datafield à inclure
        "700",
        "701",
        "710",
        "711",
        "720",
        "721"
    ],
    "code": "4", # Code du subfield à contraindre
    "value": [ # Liste des pattern
        "^((?!020).)*$",
        "^((?!050).)*$",
        "^((?!060).)*$",
        "^((?!075).)*$",
        "^((?!080).)*$",
        "^((?!140).)*$",
        "^((?!150).)*$",
        "^((?!160).)*$",
        "^((?!310).)*$",
        "^((?!320).)*$",
        "^((?!390).)*$",
        "^((?!450).)*$",
        "^((?!490).)*$",
        "^((?!500).)*$",
        "^((?!540).)*$",
        "^((?!580).)*$",
        "^((?!610).)*$",
        "^((?!620).)*$",
        "^((?!640).)*$",
        "^((?!625).)*$",
        "^((?!680).)*$",
        "^((?!700).)*$",
        "^((?!720).)*$",
        "^((?!740).)*$",
        "^((?!750).)*$",
        "^((?!735).)*$"
    ],
    "match": "all", # Type de l'operation
    "message": "7X0 et 7X1 ne doit pas contenir $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753",# Message à afficher en cas de violation
    "index": 38 # Identifiant unique de la règle
},
```
Dans ce type d'écriture de regle il faut spécifier le type de matching, match = `all` pour spécifier que tous les pattern doivent être validés, ou match = `one` pour préciser qu'au moins un pattern doit être validé.

## Ordonnancement
> Ce type de regle verifie l'ordonnancement de tous les datafield possedant le meme identifiant soient triée en fonction de leur indice.
Exemple : Si plusieurs zones 214, doivent respecter l'ordre des chiffres de l'ind2
```json
{
    "number": "214", # Numéro de la liste des datafields
    "orderBy": "ind2", # Champ sur lequel appliquer le tri
    "message": "Zones 214 : garder l'ordre des indicateurs", # Message à afficher en cas de violation
    "index": 24 # Identifiant unique de la règle
}
```

## Structurel
> Ce type de regle impose des contraintes sur la structure du document
Exemple : 328 doit contenir ind1=" " ind2="0"
```json
{
    "ind1": " ",# ind1 sur lequel appliquer la contrainte , par default ""
    "number": [ # Liste de numéro de datafields
        "328"
    ],
    "ind2": "0", # ind2 sur lequel appliquer la contrainte , par default ""
    "code": "", # Code sur lequel appliquer la contrainte , par default ""
    "type": "index", # Type de contrainte a appliquer
    "message": "Zone 328 : revoir la valeur des indicateurs", # Message à afficher en cas de violation
    "index": 38 # Identifiant unique de la règle
}
```

On doit preciser le type de contrainte a imposer sur le document :
- ``contains code`` : impose la présence d'un code pour un ou plusieurs datafield
- ``required one`` : un champ requis parmis une liste de number fournis
- ``exclude`` : impose l'abscence d'un champ dans le document
- ``required`` : impose la presence d'un champ dans le document
- ``index`` : impose des valeurs d'index pour un datafield
- ``required with value`` : champ requis avec une valeur non nulle

## Condition pour les règles suivantes
Les règles suivantes s'éxécuteront que si les conditions sont remplies.
Il existe 9 types de conditions différentes :
- ``presente`` : Retourne vrai si le champ est présent, faux sinon
- ``not_presente`` : Retourne vrai si le champ est absent, faux sinon
- ``contains_text`` : Retourne vrai si le champ est présent et qu'il contient le texte, faux sinon
- ``not_contains_text`` : Retourne vrai si le champ n'existe pas ou qu'il ne contient pas le texte, faux sinon
- ``startwith_text``: Retourne vrai si le champ existe et qu'il commence par le texte, faux sinon
- ``not_startwith_text``: Retourne vrai si le champ n'existe pas ou 
- ``equals_text`` : Retourne vrai si le champ existe et qu'il est strictement égal au texte, faux sinon
- ``not_equals_text`` : Retourne vrai si le champ n'existe pas où est différent du texte, faux sinon
- ``count_from_end``: Retourne vrai si le champ existe et que la sous chaine en partant de la fin est égal au texte, faux sinon


Exemple : 
- Condition de presence d'un champ : vérifie la présence du datafield 214 avec l'indice 2 égale à 2, et d'un subfield de code a
```json
{
    "operator": "presente", # Nom de l'opérateur
    "number": "214", # Numéro du datafield à vérifier
    "ind1": "", # Valeur de l'indice 1 du datafield
    "ind2": "2", # Valeur de l'indice 2 du datafield
    "code": "a" # Code du subfield
}
```

- Condition sur la contenance d'un texte : vérifie que le caractère a la position 10 105\$a est egal a 0
```json
{
    "operator": "contains_text", # Nom de l'opérateur
    "number": "105", # Numéro du datafield à vérifier
    "code": "a", # Code du subfield
    "pos": [ # Sous-chaîne à prélever dans le subfield
        10,
        11
    ],
    "string": [ # Texte à vérifier
        "0"
    ]
}
```

- Condition sur le commencement du texte : vérifie que la valeur de 856$5 commence par 692669902 
```json
{
    "operator": "startwith_text", # Nom de l'opérateur
    "number": "856", # Numéro du datafield à vérifier
    "code": "5", # Code du subfield à vérifier
    "string": [ # Texte à vérifier
        "692669902" 
    ]
}
```

- Condition sur l'égalité d'un texte : vérifie que la valeur de 328$z soit égal à "Reproduction de"
```json
{
    "operator": "equals_text", # Nom de l'opérateur
    "number": "328", # Numéro du datafield à vérifier
    "code": "z", # Code du subfield à vérifier
    "string": [ # Texte à vérifier
        "Reproduction de"
    ]
}
```
- Condition sur une sous-chaîne se trouvant à la fin de la chaîne de caractère : 105 $a 5e position en commençant par la fin = 1
```json
{
    "operator": "count_from_end", # Nom de l'opérateur
    "number": "105", # Numéro du datafield à vérifier
    "code": "a", # Code du subfield à vérifier
    "string": [ # Texte à vérifier
        "1"
    ],
    "pos": [ # Nombre de caractère à compter en partant de la fin
       5
    ]
}
```


## Precede
> Verifie dans un datafield qu'une sous-zone est bien precedé par une autre sous-zone
Exemple : 608\$a et 608\$2rameau, 608\$a doit être précédé d’un 608\$3

```json
 {
"condition": [
    {
        "code": "a", # Code de la seconde condition
        "number": "608", # Identifiant de la seconde condition
        "operator": "presente" # operateur condititionnel
    },
    {
        "string": [ # chaine de caractere a matcher 
            "rameau"
        ],
        "code": "2", # Code de la seconde condition
        "number": "608", # Identifiant de la seconde condition
        "operator": "startwith_text" # operateur condititionnel
    }
],
"precede": {
    "precedant": "3", # code du subfield precedant
    "depart": "a" # code du subfield precedé
},
"number": "608",# Numéro de la liste des datafields
"message": "Zones 6XX doivent être liées à une notice d'autorité RAMEAU", # Message à afficher en cas de violation
"index": 217 # Identifiant unique de la règle
}
```
## ConditionDependance

> Applique une règle de dépence si les conditions sont validées
```json
{
    "condition": [{ # Liste des conditions à vérifier
        "operator": "presente",
        "number": "225",
        "code": "",
        "ind1": "0",
        "ind2": ""
    }],
    # Les champs suivants sont les mêmes que ceux dans les règle de dépendances.
    "field1": {
        "number": "225",
        "code": "a"
    },
    "field2": {
        "number": "410",
        "code": "t"
    },
    "operator": "not_equals",
    "message": "Si 225 ind1=0 $a est différent du 410$t",
    "index": 2000
},
```

## ConditionMatching
> Applique une regle de matching si les conditions sont validées, de plus on peut imposer la présence d'un champ.

```json
{
    "condition": [{ # Liste des conditions à vérifier
            "operator": "equals_text",
            "number": "700",
            "code": "4",
            "string": [
                "340"
            ]
        }
    ],
    "number": 200,# Numéro du datafield à traîter
    "values": [{# Liste des règles de types Matching à évaluer
            "number": 200,
            "code": "f",
            "message": "",
            "regex": "(?:(?!ed.)(?!edited)(?!edit).)+",
            "subFieldRequired": false # Champ permettant d'indiquer si le subfield doit être présent ou non
        },
        {
            "number": 200,
            "code": "g",
            "message": "",
            "regex": "(?:(?!ed.)(?!edited)(?!edit).)+",
            "subFieldRequired": false # Champ permettant d'indiquer si le subfield doit être présent ou non
        }
    ],
    "type": "allRequired",
    "message": "Zones 7XX : code fonction, vérifier qu'il s'agit d'un éditeur scientifique ou d'un directeur de publication ?", # Message à afficher en cas de violation
    "index": 6000 # Identifiant unique de la règle
}
```

Le champ ``type`` peut contenir deux valeurs :
- La valeur ``allRequired`` indiquant que tous les tests dans values doivent réussir
- La valeur ``oneRequired`` indiquant qu'il faut au moins que l'un des test présent dans values réussisse

## ConditionStructurel
> Applique une règle de type structurelle si les conditions sont validées. Ces règles de structures peuvent être appliqués soit sur le PPN en cours de traitement, soit sur un autre PPN (réciproque)
Exemple : Si le datafield 225 possède un indice 1 qui a une valeur à 0, alors il faut un datafield 410
 ```json
 {
    "condition": [ # Liste des conditions à vérifier
        {
            "code": "",
            "ind1": "0",
            "number": "225",
            "operator": "presente",
            "ind2": ""
        }
    ],
    "number": "225", # Numéro du datafield à traiter
    "type": "allRequired",
    "value": [
        {
            "number": "410", # Numéro du datafield
            "code": "", # Code du datafield
            "ind1": undefined,# Valeur de l'indice 1 du datafield
            "ind2": undefined,# Valeur de l'indice 2 du datafield
            "reciproque": undefined,# Indique si la règle est réciproque ou non
            "present": true # Indique si le champ doit être présent
        }
    ]
    "message": "Si 225 ind1=0 il faut au moins une 410",# Message à afficher en cas de violation
    "index": 199 # Identifiant unique de la règle
},
 ```

 
 
Le champ ``type`` peut contenir deux valeurs :
- La valeur ``allRequired`` indiquant que tous les tests dans values doivent réussir
- La valeur ``oneRequired`` indiquant qu'il faut au moins que l'un des test présent dans values réussisse