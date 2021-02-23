/**
 * Crée un objet destiné à la création du regex.
 * @param {
 *      rules : liste de règles sur des motifs, pour le générateur (generator.js)
 *      names : liste de tags à afficher pour chaque règle
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