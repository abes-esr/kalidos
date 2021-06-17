

### Regex
```
3	x	x	x	x	100	100 $a Pos. 22-24 = fre		Zone 104 : langue de catalogage à corriger
5	x	x	x	x	100	100 ne doit pas contenir le caractère "|"		Données codées à compléter
20	x	x	x	x	105	105 ne doit pas contenir le caractère "|"		Zone 105 à compléter
25	x	x	x	x	200	200 ne doit pas contenir deux espaces à la suite		Zone 200 : supprimer le double espace
26	x	x	x	x	200	200$d doit commencer par "= espace"		Zone 200 : corriger la ponctuation du titre parallèle : "$d= Titre"
28	x	x	x	x	200	200$a ne doit pas contenir le caractère "/" ou ":" ou "."		Zone 200 : le titre ne doit pas comporter une ponctuation ISBD introduite par une sous-zone
29	x	x	x	x	200	200$e ne doit pas contenir le caractère "/" ou ":" ou "."		Zone 200 : le titre ne doit pas comporter une ponctuation ISBD introduite par une sous-zone
30	x	x	x	x	200	200$d ne doit pas contenir le caractère "/" ou ":" ou "."		Zone 200 : le titre ne doit pas comporter une ponctuation ISBD introduite par une sous-zone
31	x	x	x	x	200	200$c ne doit pas contenir le caractère "/" ou ":" ou "."		Zone 200 : le titre ne doit pas comporter une ponctuation ISBD introduite par une sous-zone
49	x	x	x	x	600	Si 600 $2rameau doit être présent		Zone 6XX $2 mal orthographié ou absent
51	x	x	x	x	601	Si 601 $2rameau doit être présent		Zone 6XX $2 mal orthographié ou absent
53	x	x	x	x	602	Si 602 $2rameau doit être présent		Zone 6XX $2 mal orthographié ou absent
55	x	x	x	x	604	Si 602 $2rameau doit être présent		Zone 6XX $2 mal orthographié ou absent
57	x	x	x	x	605	Si 605 $2rameau doit être présent		Zone 6XX $2 mal orthographié ou absent
59	x	x	x	x	606	606 et $3, doit contenir $2rameau ou $2fmesh		Zone 6XX $2 mal orthographié ou absent
62	x	x	x	x	607	Si 607 $2rameau doit être présent		Zone 6XX $2 mal orthographié ou absent
64	x	x	x	x	608	608 et $3 doit contenir $2rameau ou $2fmesh		Zone 6XX $2 mal orthographié ou absent
66	x	x	x	x	700	700$f doit contenir  au moins 9 caractères		Vérifier les dates de l'autorité auteur
68	x	x	x	x	701	701$f doit contenir au moins 9 caractères		Vérifier les dates de l'autorité auteur
83	x	x	x	x	6XX	6XX $2 ne doit pas contenir "RAMEAU", "Rameau", "Ram" ou "ram"	6XX = 600, 601, 602, 604, 605, 606, 607, 608	Zones 6XX : $2 mal orthographié
84	x	x	x	x	Partout	Ne doit pas contenir le caractère "’"	Caractère " ' " ok	Mauvaise apostrophe présente dans la notice
87	x	x	x	x	7XX	7XX $4 ne doit pas être 000		Zones 7XX : code fonction erroné
88	x	x	x	x	7XX	7XX $4 ne doit pas être 205		Zones 7XX : code fonction à employer uniquement lorsqu'aucune autre fonction plus spécifique ne convient
89	x	x	x	x	7XX	7X0 et 7X1 ne doit pas contenir $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753	7X0 = 700, 710, 720 ; 7X1 = 701, 711, 721	Zones 7XX : ce code fonction ne peut pas être attribué à l'Œuvre ou l'Expression
90	x	x	x	x	7XX	7X2 $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753	7X2 = 702, 712, 722	Zones 7XX : ce code fonction ne peut pas être attribuée à la Manifestation ou l'Item
91	x			x	7XX	7X0 et 7X1 $4340 et 200$f ou 200g contient "éd." ou "edited" ou "édit"		Zones 7XX : code fonction, vérifier qu'il s'agit d'un éditeur scientifique ou d'un directeur de publication ?
94	x	x	x		230	230 ne doit pas contenir "Mo"		Zone 230 : corriger le poids en Ko
95	x	x	x		230	230 ne doit pas contenir le caractère ","		Zone 230 : corriger le poids en Ko
96	x	x	x		230	230 ne doit pas contenir "X Ko"		Zone 230 : corriger le poids en Ko
97		x	x	x	215	215$a ne doit pas contenir "nombre de"		Zone 215 : compléter la pagination
98		x			029	029$b doit contenir 12 caractères	029 différence entre reproduction et autre édition !	Zone 029 : le numéro d'ordre doit contenir 12 caractères
99		x			029	029$b ne doit pas contenir le caractère "?"		Zone 029 : remplacer "?" par le numéro d'ordre
100		x			029	029$a=FR		Zone 029$a doit être FR
103		x	x		100	100$a ne doit pas contenir le caractère "?"		Zone 100 à compléter
104		x			102	102 doit être 102 ##$aFR		Zone 102 $a doit être FR
107		x	x		200	200$a ne doit pas être "Le Titre"		Zone 200 : compléter le titre
108		x	x		200	200$e ne doit pas être "complément du titre"		Zone 200 : renseigner le complément de titre
109		x	x		200	200$f ne doit pas être "Auteur"		Zone 200 : compléter le nom de l'auteur
110		x	x		200	200$g ne doit pas finir par "sous la direction de"		Zone 200 : ajouter le nom du directeur de thèse
113		x	x		214	214$d ne doit pas contenir le caractère "?"		Zone 214 à compléter
114	x	x			230	230$a ne doit pas contenir le caractère "?"		Zone 230 à compléter
115	x	x	x		307	307$a ne doit pas contenir le caractère "?"		Zone 307 à compléter
116		x	x		320	320$a ne doit pas contenir "p. ou f."		Zone 320 à compléter
120		x	x	x	328	328$c ne doit pas contenir le caractère ":" ou ";" ou "?" ou "/" 		Zone 328$c : les sous-disciplines doivent être séparées par un point
121		x	x		328	328$c ne doit pas contenir "Discipline"		Zone 328$c compléter la discipline
122		x	x	x	328	328$d doit contenir uniquement 4 chiffres		Zone 328$d doit contenir uniquement l'année de soutenance
123		x	x	x	328	328$d ne doit pas contenir le caractère "?" ou ";" ou ","		Zone 328$d doit contenir uniquement l'année de soutenance
124		x	x		328	328$e = "Lyon 1" ou "Université de Lyon" ou "Lyon"		Zone 328$e : nom de l'établissement de soutenance erroné
125		x	x		330	330$a ne doit pas contenir "Résumé en français"		Zone 330 à compléter
127	x	x	x	x	606	606$a ne doit pas contenir "vedette"		Zone 606 à compléter
128		x	x		700	700$a ne doit pas contenir "Nom"		Zone 700 : lien auteur à effectuer
129		x	x		700	700$b ne doit pas contenir "Prénom"		Zone 700 : lien auteur à effectuer
130		x	x		700	700$4=070		Zone 700 : le code fonction doit être 070 pour l'auteur ou co-auteur de la thèse
131		x			701	7001 ne doit pas contenir "Nom du co-auteur" ou "Nom du directeur"		Zone 701 : lien auteur à effectuer
132		x			701	701$b ne doit pas contenir "Prénom"		Zone 701 : lien auteur à effectuer
135	x	x	x		856	856$u ne doit pas contenir "URL"		Zone 856$u : renseigner l'URL de la ressource
157	x				339	339$d ne doit pas contenir "Année de mise en ligne"		Zone 339 : corriger avec l'année de mise en ligne
169	x				230	230 ne doit pas contenir "X vues"		Zone 230 à compléter
170	x				307	307 ne doit pas contenir "est de : X pages"		Zone 307 à compléter
171	x				303	303 ne doit pas contenir "AAAA-MM-JJ"		Zone 303 à compléter
172	x				305	305$a ne doit pas être égal à "Note sur l'édition et l'histoire bibliographique"		Zone 305 générique à remplacer-supprimer
173	x				324	324$a ne doit pas être égal à "Reproduction numérique de l'édition de LIEU : EDITEUR, DATE"		Zone 324 à compléter
174	x				337	337 ne doit pas contenir "fichier au(x) format(s)…"		Zone 337 à compléter
175	x	x	x		856	856$2 ne doit pas contenir "Texte du lien"		Zone 305$2 générique à remplacer-supprimer
176	x	x	x		856	856$q ne doit pas contenir "Format"		Zone 856$q : renseigner le format
181		x	x		017	017$2=MEMLyon1		107$2 à corriger ("MEMLyon1")
```

### Dependance
```
4	x	x	x	x	100	100 $a Pos. 9-12 >= Pos. 13-16		Dates incohérentes : vérifier les dates zone 100
4	x	x	x	x	100	100 $a Pos. 9-12 >= Pos. 13-16		Dates incohérentes : vérifier les dates zone 100
101		x			029	029$b, les 4 premières positions doivent être identiques à celles de 328$d		Année de soutenance : l'année en 029 et 328 doivent être identiques

```
### Structurel
```
1	x	x	x	x	008	008 doit contenir "x3"		Zone 008 erronée
22	x	x	x	x	181	181 obligatoire		La notice doit contenir au moins une zone 181
23	x	x	x	x	182	182 obligatoire		La notice doit contenir au moins une zone 182
24	x	x	x	x	183	183 obligatoire		La notice doit contenir au moins zone 183
27	x	x	x	x	200	200$b ne doit pas être présente		Zone 200$d : à remplacer par les zones 181, 182 et 183
32	x	x	x	x	210	210 ne doit pas être présente		Zone 210 à remplacer par 214 (document en main)
35	x	x	x	x	214	Si 214 #1 $d obligatoire		Zone 214 : une date est obligatoire
46	x	x	x	x	309	309 ne doit pas être présente		 Supprimer la zone 309 une fois la correction demandée effectuée
85	x	x	x	x	7XX	7XX obligatoire	7XX = 700, 701, 702, 710, 711, 712, 720, 721 ou 722	Mention d'auteur obligatoire
86	x	x	x	x	7XX	7XX doit toujours contenir un $3		Zones 7XX : lier à une notice d'autorité
117		x	x	x	328	328 doit contenir ind1=" " ind2="0"		Zone 328 : revoir la valeur des indicateurs
118			x		328	328$z  doit pas être présente		Zone 328 incohérente avec le statut de la thèse : une reproduction doit contenir la sous-zone $z
119		x			328	328$z ne doit pas être présente		Zone 328$z incohérente avec le statut de la thèse
126		x			608	608$3027253139 doit être présente		Zone 608 : indexation Forme-Genre obligatoire (PPN 027253139)

77	x	x	x	x	6XX	6XX et $2rameau doit contenir $3	6XX = 600, 601, 602, 604, 605, 606, 607, 608	Zones 6XX doivent être liées à une notice d'autorité RAMEAU
133		x			711	Au moins une 711$3026402823$4295 doit être présente		Zone 711 : université de soutenance doit être présente (711$3026402823$4295)
145		x			455	455 ne doit pas être présente		Zone 455 incompatible avec le type de thèse (soutenance)
147			x		456	456 ne doit pas être présente		Zone 456 incompatible avec le type de thèse (reproduction)
155	x				303	303 doit être présente		Ressource électronique : doit contenir une zone 303
156	x				339	339 doit être présente		Ressource électronique : doit contenir une zone 339
```
### Conditionnel
##### condition-regex
```

(FAIT)11	x	x	x	x	105	Si  105 $a Pos. 0-3 différent de la valeur "y" alors 215$c ne doit pas être vide		Mention d'illustrations incohérente : vérifier zones 105 et 215
(FAIT)13	x			x	105	Si 105 $a Pos. 8 = 1 alors il faut aussi une 608 ‎$302886431X $aActes de congrès			Mention de congrès incohérente : vérifier zones 105 et 608
(FAIT)14	x	x	x	x	105	Si 105 $a Pos. 8 = 0 alors il ne doit pas y avoir 608 ‎$302886431XActes de congrès		Mention de congrès : vérifier zones 105 et 608
(FAIT)15	x	x	x	x	105	Si 105 $a Pos. 10 =1 alors il faut une 320 avec la mention "Index"		Mention d'index incohérente : vérifier zones 105 et 320
(FAIT)16	x	x	x	x	105	Si 105 $a Pos. 10 =0 alors il ne doit pas y avoir une 320 avec la mention "Index"		Mention d'index incohérente : vérifier zones 105 et 320
(FAIT)19	x	x	x	x	105	Si 105 $a Pos. 4-7= m ou 7 il faut une 608 $3027253139Thèses et écrits académiques		Zone 608 : indexation Forme-Genre obligatoire
(FAIT)33	x			x	214	Si 214 #4$d, la zone doit commencer par "C espace"		Zone 214 : qualificatifs de la date non conformes
(FAIT)36	x		x	x	214	Si 214 #0 et $d, doit commencer par "DL espace" ou "[" ou un chiffre		Zone 214 : qualificatifs de la date non conforme
(FAIT)149			x		214	Si 214 ind2=2, alors $aLyon		Zone 214$a incohérente avec le statut de la thèse (reproduction)
(FAIT)150					214	Si 214 ind2=2, alors $cBibliothèque Lyon 1		Zone 214$c incohérente avec le statut de la thèse (reproduction)

(FAIT)136	x	x	x		856	856$zAccès au texte intégral sauf si 856$5=692669902, alors $zAccès réservé aux membres de Lyon 1 après authentification		Zone 856 : le texte ne correspond pas au type d'accès (internet-intranet)
(FAIT)138		x	x		856	Si 856$5=692669902, alors doit être présente 310 ##$aL'accès à cette ressource est réservé aux membres de Lyon 1 après authentification		Zone E856 : une note 310 doit préciser le type d'accès restreint

(FAIT)140	x	x	x	x	451	Si 008 commence par Oa et 451 présente, alors vérifier que notice 451$0 contient une 008 qui commence par Oa		Vérifier la pertinence des liens réciproques
(FAIT)141	x	x	x	x	451	Si 008 commence par Aa et 451 présente, alors vérifier que notice 451$0 contient une 008 qui commence par Aa		Vérifier la pertinence des liens réciproques
(FAIT)143	x	x	x	x	452	Si 008 commence par Oa et 452 présente, alors vérifier que notice 452$0 contient une 008 qui commence par Aa		Vérifier la pertinence des liens réciproques
(FAIT)144	x	x	x	x	452	Si 008 commence par Aa et 452 présente, alors vérifier que notice 452$0 contient une 008 qui commence par Oa		Vérifier la pertinence des liens réciproques
(FAIT)159			x		455	Si 455, alors vérifier que la notice en 455$0 contient 105$a Pos. 4-7= m		Vérifier la pertinence des liens réciproques
(Supprimer)161				x	456	Si 456, alors vérifier que la notice en 456$0 contient une 008 qui commence par Oa		Vérifier la pertinence des liens réciproques
(Supprimer)162	x				455	Si 455, alors vérifier que la notice en 455$0 contient une 008 qui commence par Aa		Vérifier la pertinence des liens réciproques

(FAIT)168	x				214	Si 305$a commence par "Document numérisé dans le cadre du projet de numérisation", 214 $aLyon et $cBibliothèque Lyon 1		Document numérique FA : corriger la zone 214 $aLyon et $cBibliothèque Lyon 1

(FAIT)185			x	x	701	Si 328$zReproduction de, alors il faut une 701‎$4727		Zone 701 : une reproduction à l'identique d'une thèse doit mentionner le directeur de thèse
(FAIT)186			x	x	701	Si 328$z n'est pas "Reproduction de", alors 701‎$4727 ne doit pas être présente		Zone 701 : incohérente pour une autre édition d'une thèse
(FAIT)187			x	x	711	Si 328$zReproduction de, alors il faut une 711‎$4295		Zone 711 : une reproduction à l'identique d'une thèse doit mentionner l'établissement de soutenance
(FAIT)188			x	x	711	Si 328$z n'est pas "Reproduction de", alors 711‎$4295 ne doit pas être présente		Zone 711 : incohérente pour une autre édition d'une thèse
(FAIT)189			x	x	608	Si 328$zReproduction de, alors il faut une 608 $3027253139Thèses et écrits académiques		Zone 608 : une reproduction à l'identique d'une thèse doit comporter une 608 $3027253139Thèses et écrits académiques

(FAIT)194		x			456	Si 456, alors vérifier que la notice en 456$0 contient 105$a Pos. 4-7= v		Vérifier la pertinence des liens réciproques


(FAIT)190			x	x	608	Si 328$z n'est pas "Reproduction de", alors 608 $3027253139Thèses et écrits académiques ne doit pas être présente		Zone 608 : incohérente pour une autre édition d'une thèse


```
##### condition-structurel
```
(FAIT) 6	x	x	x	x	101	Si 101 ind1=1 il faut au moins un $a et $c		Zone 101 : vérifier l'indicateur et les langues
(FAIT) 7	x	x	x	x	101	Si 101 ind1=0 il ne faut pas $c		Zone 101 : vérifier l'indicateur et les langues
(FAIT) 8	x	x	x	x	101	Si 101 ind1=2 il faut au moins une $a, $b et $c		Zone 101 : vérifier l'indicateur et les langues
(FAIT) 9	x	x	x	x	101	Si 101 ind1=1 il faut une 454		Compléter avec le titre original en 454
(FAIT) 10	x	x	x	x	101	Si 101 ind1=2 il faut une 454		Compléter avec le titre original en 454
(FAIT)12	x	x	x	x	105	Si  105 $a Pos. 0-3 = "y" alors 215$c ne doit pas être présent		Mention d'illustrations incohérente : vérifier zones 105 et 215
(FAIT)17	x	x	x	x	105	Si 105 $a Pos. 4-7 =a alors il faut une 320		Mention de bibliographie incohérente : vérifier zones 105 et 320
(FAIT)18	x	x	x	x	105	Si 105 $a Pos. 4-7= t, m, l, q, j, f, e, b ou 7 il faut la présence d'une 608		Zone 608 : indexation Forme-Genre à vérifier
(FAIT)21		x	x	x	106	Si 008 commence par Aa, présence obligatoire d'une zone 106		Zone 106 à compléter
(FAIT)34	x	x	x	x	214	214 #0 ou 214#1 obligatoire, sauf si 105$b=v		Zone 214 incohérente : vérifier zones 105 et 214
(FAIT)38		x	x	x	215	Si 008 commence par Aa, 215 $a et $d obligatoires		Zone 215 : collation obligatoire pour une ressource imprimée
(FAIT)39	x			x	225	Si 225 ind1=0 il faut au moins une 410		Zone 410 : obligatoire avec une 225
(FAIT)42	x			x	225	Si 225 ind1=0 $a alors 410$0 doit être présent		Zone 410 : obligatoire avec une 225
(FAIT)43	x			x	225	Si 225 ind1=2 $a alors 410$0 doit être présent		Zone 410 : obligatoire avec une 225
(FAIT)44	x			x	225	Si 225 ind1=1 $a alors 461 doit être présent		Zone 461 : obligatoire
(FAIT)45	x			x	225	Si 225 ind1=2 il faut au moins une 410		Zone 410 : obligatoire avec une 225
(FAIT)92			x		455	Si 328$z"Reproduction de", 455 doit être présente		Vérifier les liens entre la version de soutenance et la reproduction
(FAIT)93			x		456	Si 328$z"Reproduction de" , 456 ne doit pas être présente		Zone 456 incompatible avec le type de thèse (reproduction)
(FAIT)105		x	x		101	Si 101$d, 330 doit être présente		Mention de résumé incohérente : vérifier zones 101 et 330
(FAIT)137	x				856	Si 856$5=692669902, une 310 doit être présente		Zone E856 : une note 310 doit préciser le type d'accès restreint
(FAIT)151	x	x	x		304	Si 008 commence par Oa,  304 doit être présente		Ressource électronique : doit contenir une zone 304
(FAIT)152	x	x	x		307	Si 008 commence par Oa, 307 doit être présente		Ressource électronique : doit contenir une zone 307
(FAIT)153	x	x	x		337	Si 008 commence par Oa, 337 doit être présente		Ressource électronique : doit contenir une zone 337
(FAIT)154	x	x	x		230	Si 008 commence par Oa, 230 doit être présente		Ressource électronique : doit contenir une zone 230

(Supprimer)78	x	x	x	x	6XX	6XX $a, $x ou $y doit contenir toujours $3 sauf si $2lc ou $2mesh		Zones 6XX doivent être liées à une notice d'autorité RAMEAU ou Fmesh
(FAIT)134	x	x	x		856	Si 008 commence par Oa et ne contient pas une 215, une 856 doit être présente		Zone 856 : une ressource électronique doit contenir l'accès


(FAIT) 139		x	x		451	Si 451, alors vérifier que la notice 451$0 contient une 451 réciproque et une 328$z	Exemple : http://www.sudoc.fr/19872604X.xml	Vérifier la pertinence des liens réciproques
(FAIT)142		x	x		452	Si 452, alors vérifier que la notice 452$0 contient une 452 réciproque et une 328$z		Vérifier la pertinence des liens réciproques
(FAIT)146	x	x	x	x	488	Si 488, alors vérifier les liens réciproques de la notice en 488$0		Vérifier la pertinence des liens réciproques
(FAIT)148			x		455	Si 455, alors vérifier que la notice en 455$0 contient une 456 avec liens réciproques		Vérifier la pertinence des liens réciproques
(FAIT)158			x		455	Si 455, alors vérifier que la notice en 455$0 ne contient pas 328$z		Vérifier la pertinence des liens réciproques
(FAIT)160				x	456	Si 456, alors vérifier que la notice en 456$0 contient une 455 avec liens réciproques		Vérifier la pertinence des liens réciproques
(FAIT)163	x				455	Si 455, alors vérifier que la notice en 455$0 contient une 456 avec liens réciproques		Vérifier la pertinence des liens réciproques
(FAIT)192		x			456	Si 456, alors vérifier que la notice en 456$0 contient une 455 avec liens réciproques		Vérifier la pertinence des liens réciproques
(FAIT)193		x			456	Si 456, alors vérifier que la notice en 465$0  contient  328$z		Vérifier la pertinence des liens réciproques

(FAIT)164		x	x	x	456	Si 325$a commence par "Document numérisé dans le cadre d'un projet de numérisation du SCD de Lyon 1", 456 doit être présente		Document numérisé : ajouter un lien 456 vers la reproduction
(FAIT)165	x				324	Si 305$a commence par "Document numérisé dans le cadre du projet de numérisation", doit contenir une 324		Document numérique FA : ajouter la zone 324
(FAIT)166	x				455	Si 305$a commence par "Document numérisé dans le cadre du projet de numérisation", doit contenir une 455		Document numérique FA : ajouter un lien 455 vers l'original

(FAIT)178		x			029	Si 105 $a Pos. 4-7= "m", alors il faut une 029		Zone 029 obligatoire pour une thèse (soutenance)
(FAIT)179		x	x	x	328	Si 105 $a Pos. 4-7= "m" ou "7", alors il faut une 328		Zone 328 obligatoire pour une thèse ou mémoire (soutenance)
(FAIT)180		x			017	Si 105 $a Pos. 4-7= "v" ou "7", alors il faut une 017		Zone 017  nécessaire pour un mémoire
(FAIT)182			x	x	328	Si 105 $a Pos. 4-7= "v", alors il faut une 328$z		Zone 328 incohérente avec le type de thèse (reproduction)
(FAIT)183			x	x	029	Si 328$zReproduction de, alors il faut une 029		Zone 029 obligatoire pour une reproduction à l'identique d'une thèse
(FAIT)184			x	x	029	Si 328$z n'est pas "Reproduction de", alors 029 ne doit pas être présente		Zone 029 incohérente pour une autre édition d'une thèse
(Supprimer)191			x	x	455	Si 328$zReproduction de, alors il faut une 455		Zone 455 obligatoire pour une reproduction à l'identique d'une thèse

(FAIT)47	x			x	461	Si 008 commence par Aa et présence d'une 461, alors il doit y avoir une 305 ou 225		Zones incohérentes : vérifier les zones 461 et 225 (monographie en plusieurs volumes) ou 305 (numéro de périodique)

(FAIT)203		x	x		451	Si 451 et 328$z, alors vérifier que la notice 451$0 ne contient pas 328$z	Exemple : http://www.sudoc.fr/19872604X.xml	Vérifier la pertinence des liens réciproques	Notice083+084	Notice085+086																
(FAIT)204		x	x		451	Si 451 et absence de 328$z, alors vérifier que la notice 451$0 contient 328$z			Notice053+054	Notice081+082			
(FAIT)167	x				214	Si 305$a commence par "Document numérisé dans le cadre du projet de numérisation", 214 ind1=' ' et ind2="0"		Document numérique FA : doit contenir une mention de publication en 214 (indicateurs #0)


```
##### condition-dependance
```
(FAIT)40	x			x	225	Si 225 ind1=0 $a est différent du 410$t		Mention de collection incohérente : vérifier zones 410 et 225
(FAIT)41	x			x	225	Si 225 ind1=2 $a = 410$t		Mention de collection incohérente : vérifier zones 410 et 225
(FAIT)177	x				455	Si 455, alors la date en 455$d = date en zone 100 position 13-16 		Dates incohérentes : vérifier la date en zone 100 et la date de la ressource liée

```

### Ajax
```
48	x	x	x	x	600	Si 600$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tp	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
50	x	x	x	x	601	Si 601$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tb	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
52	x	x	x	x	602	Si 602$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Ta	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
54	x	x	x	x	604	Si 604$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tq	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
56	x	x	x	x	605	Si 605$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tu	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
58	x	x	x	x	606	Si 606$a et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Td	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
60	x	x	x	x	607	Si 606$a et $2fmesh, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tl	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
61	x	x	x	x	607	Si 607$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tg	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
63	x	x	x	x	608	Si 608$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tf	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
65	x	x	x	x	616	Si 616$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tm	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité
67	x	x	x	x	700	Si 700, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tp	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
69	x	x	x	x	701	Si 701, vérifier dans Idref ,à partir de l'identifiant $3, que 008=Tp	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
70	x	x	x	x	702	Si 702, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tp	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
71	x	x	x	x	710	Si 710, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tb	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
72	x	x	x	x	711	Si 711, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tb	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
73	x	x	x	x	712	Si 712, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tb	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
74	x	x	x	x	720	Si 720, vérifier dans Idref, à partir de l'identifiant $3, que 008=Ta	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
75	x	x	x	x	721	Si 721, vérifier dans Idref, à partir de l'identifiant $3, que 008=Ta	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
76	x	x	x	x	722	Si 722, vérifier dans Idref, à partir de l'identifiant $3, que 008=Ta	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité
79	x	x	x	x	6XX	Si 6XX$x et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008=Td	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier que la zone 6XX est liée à une autorité RAMEAU
80	x	x	x	x	6XX	Si 6XX$x et $2fmesh, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tl	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier que la zone 6XX est liée à une autorité fmesh
81	x	x	x	x	6XX	Si 6XX$y et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tg	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier que la zone 6XX est liée à une autorité RAMEAU
82	x	x	x	x	6XX	Si 6XX$z et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tz	Vérification externe Idref : https://www.idref.fr/PPN.xml	Incohérence indexation : vérifier que la zone 6XX est liée à une autorité RAMEAU
```



### Autre
```
37	x		x	x	214	Si plusieurs zones 214, doivent respecter l'ordre des chiffres de l'ind2		Zones 214 : garder l'ordre des indicateurs

106		x	x		101	Si plusieurs 101$d, il doit y avoir autant de 330		Mention de résumé incohérente : vérifier zones 101 et le nombre de zones 330

```



### wtf ?
```
102		x	x		100	100 ind1=0		Zone 100 : l'année de soutenance est vraiment incertaine ?
111			x		214	214 ind2="0" ou ind2="2"		Zone 214 incohérente avec statut de la thèse (reproduction)
112		x			214	214 ind2="1"		Zone 214 incohérente avec statut de la thèse (soutenance)
```










