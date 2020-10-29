const Parcours = require("./Parcours");

/* 
Dependance
- 100$a = 214$d
- 100 $a >$e
- 101 $a >=$f

Conditionelle

    condition structurelle 

- Si 214 #1 $d obligatoire
- Si 225 ind1=0 $a alors 410$0 doit être présent
- Si 225 ind1=2 $a alors 410$0 doit être présent    
- Si 225 ind1=1 $a alors 461 doit être présent
- Si 225 ind1=2 il faut au moins une 410
- Si 101 ind1=1 il faut au moins un $a et $c
- Si 101 ind1=0 il ne faut pas $c
- Si 101 ind1=2 il faut au moins une $a, $b et $c
- Si 101 ind1=1 il faut une 454
- Si  105 $a Pos. 0-3 = "y" alors 215$c ne doit pas être présent
- Si 225 ind1=0 il faut au moins une 410
- Si 105 $a Pos. 4-7 =a alors il faut une 320
- Si 105 $a Pos. 4-7= t, m, l, q, j, f, e, b ou 7 il faut la présence d'une 608
- Si 008 = Aax3, présence obligatoire d'une zone 106

- 214 #0 ou 214#1 obligatoire, sauf si 105$b=v <=> SI 105$b != v , 214 #0 ou 214#1 obligatoire

    condition structurelle + matching
- Si 105 $a Pos. 8 = 1 alors il faut aussi une 608 ‎$302886431XActes de congrès
- Si 105 $a Pos. 8 = 0 alors il ne doit pas y avoir 608 ‎$302886431XActes de congrès
- Si 105 $a Pos. 10 =1 alors il faut une 320 avec la mention "Index"
- Si 105 $a Pos. 10 =0 alors il ne doit pas y avoir une 320 avec la mention "Index"
- Si 214 #4$d, la zone doit commencer par "C espace"
- Si 214 #0 et $d, doit commencer par "DL espace" ou "[" ou un chiffre
- Si 105 $a Pos. 4-7= m ou 7 il faut une 608 $3027253139Thèses et écrits académiques

    condition structurelle + dependance
- Si 225 ind1=0 $a est différent du 410$t
- Si 225 ind1=2 $a = 410$t

???
- Si plusieurs zones 214, doivent respecter l'ordre des chiffres de l'ind2


AJAX 
- Si 600$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tp
- Si 601$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tb
- Si 602$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Ta
- Si 604$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tq
- Si 605$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tu
- Si 606$a et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Td
- Si 606$a et $2fmesh, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tl
- Si 607$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tg
- Si 608$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tf
- Si 616$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 =Tm
- Si 700, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tp
- Si 701, vérifier dans Idref ,à partir de l'identifiant $3, que 008=Tp
- Si 710, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tb
- Si 711, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tb
- Si 712, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tb
- Si 720, vérifier dans Idref, à partir de l'identifiant $3, que 008=Ta
- Si 721, vérifier dans Idref, à partir de l'identifiant $3, que 008=Ta
- Si 722, vérifier dans Idref, à partir de l'identifiant $3, que 008=Ta
- Si 6XX$x et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008=Td
- Si 6XX$x et $2fmesh, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tl
- Si 6XX$y et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tg
- Si 6XX$z et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008=Tz


regles ???
- 608 et $3 doit contenir $2rameau ou $2fmesh
- 6XX et $2rameau doit contenir $3
- 6XX $a, $x ou $y doit contenir toujours $3 sauf si $2lc ou $2mesh


 */

var Conditionnel = function () {

    var testMatchConditionnelRules = function (rules, controlfields, datafields, resultJson) {

    }

    return {
        testMatchConditionnelRules : testMatchConditionnelRules
    }
}();

module.exports = Conditionnel;