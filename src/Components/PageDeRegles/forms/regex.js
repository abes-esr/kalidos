/**
 * Cree un objet destinee a la creation du regex
 * @param {
 *      rules : liste de regles sur des motifs, pour le generateur (generator.js)
 *      names : liste de tags a afficher pour chaque regle
 * } rules 
 */
export const regexCreator = (rules) => ({
    title: "Création du regex",
    type: "object",
    properties: {
        rule: {
            title: 'Regle a utiliser',
            type: 'string',
            enum: rules.rules,
            enumNames: rules.names,
        },
        isWord: {
            title: ' Le motif contient de mots',
            enum: [true, false],
            enumNames: ["Oui", "Non"],
            default: false
        },
        patterns: {
            title: 'Motif(s) a utiliser par la regle',
            type: 'array',
            minItems: 1,
            items: {
                type: 'string',
            },
        },
    },
    required: ['rule', 'isWord', 'patterns']
})