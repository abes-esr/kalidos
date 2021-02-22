import { matchingOperators } from "../operators";

/**
 * Objet schema pour le tableau de conditions a remplir par l'utilisateur
 */
export const conditions = {
    title:"Conditions",
    type: "array",
    items: {
        type: "object",
        properties: {
            number: {
                title: "Zone",
                type: "string",
            },
            code: {
                title: 'Sous Zone',
                type: 'string',
                default: ""
            },
            operator: {
                title: "Operateur de matching",
                type: "string",
                enum: matchingOperators.rules,
                enumNames: matchingOperators.names
            }
        },
        required: ['number', 'operator'],
        dependencies: {
            operator: {
                oneOf: [
                    {
                        properties: {
                            operator: { enum: ["presente", "not_presente"] },
                            ind1: {
                                title: "Indice 1 du datafield",
                                type: "string",
                                default: ""
                            },
                            ind2: {
                                title: "Indice 2 du datafield",
                                type: "string",
                                default: ""
                            },
                        },
                    },
                    {
                        properties: {
                            operator: { enum: ["contains_text", "not_contains_text"] },
                            pos: {
                                title: "Sous-chaîne à prélever dans le subfield",
                                type: "array",
                                maxItems: 2,
                                items:{
                                    title: " Position dans le XML",
                                    type: "number"
                                }
                            },
                            string: {
                                title: "Texte(s) à vérifier",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                        },
                        required: ['pos', 'string']
                    },
                    {
                        properties: {
                            operator: { enum: ["startwith_text", "not_startwith_text", "equals_text", "not_equals_text"] },
                            string: {
                                title: "Texte(s) à vérifier",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                        },
                        required: ['string']
                    },
                    {
                        properties: {
                            operator: { enum: ["count_from_end"] },
                            pos: {
                                title: "Nombre de caractère à compter en partant de la fin",
                                type: "array",
                                maxItems: 1,
                                items:{
                                    type: "number"
                                }
                            },
                            string: {
                                title: "Texte(s) à vérifier",
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                        },
                        required: ['pos', 'string']
                    },
                ]
            }
        }
    }
}

