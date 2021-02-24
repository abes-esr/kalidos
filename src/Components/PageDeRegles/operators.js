/**
 * Objets qui représentent les opérateurs des règles avec leur tags (noms à utiliser dans l'interface).
 * 
 */

export const mathOperators = 
{
    rules :
    [
        'equals',
        'not_equals',
        'greater',
        'greaterEquals',
        'lesser',
        'lesserEquals',
    ],
    names: 
    [
        "Égale à",
        "Ne soit pas égale à",
        "Plus grand que",
        "Plus grand ou egal que",
        "Plus petit que",
        "Plus petit ou egal que",
    ]

}


export const matchingOperators = 
{
    rules: 
    [
        "presente" ,
        "not_presente" ,
        "contains_text" ,
        "not_contains_text" ,
        "startwith_text" ,
        "not_startwith_text" ,
        "equals_text" ,
        "not_equals_text" ,
        "count_from_end"
    ],
    names: 
    [
        "Le champ est présent",
        "Le champ est absent",
        "le champ est présent et il contient le texte",
        "Ne doit pas contenir",
        "Commence par",
        "Ne doit pas commencer par",
        "Égale à",
        "Ne soit pas égale à",
        "Champ existant et sous chaine en partant de la fin est égal au texte "
    ]
}

export const structuralOperators = 
{
    rules:
    [
        "required",
        "require one",
        "exclude",
        "contains code",
        "index",
        "required with value"
    ],
    names:
    [
        "Le champ doit être present",
        "Un champ requis parmis une liste",
        "Abscence d'un champ dans le document",
        "Contiens un code pour un/plusieurs datafield",
        "Valeurs d'index",
        "Le valeur doit pas etre avec valeur",
    ]
}