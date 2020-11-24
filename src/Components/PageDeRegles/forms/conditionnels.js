export function getSchemaConditionnels(categories, rules) {
    return {
        type: "object",
        properties: {
            number: {
                title: "Zone",
                type: "array",
                items: {
                    type: "string",
                },
            },
            operator: {
                title: "Opérateur",
                type: "string",
                enum: ["ET", "Égal"],
                    },
            Parametre1: {
                title: "Premier paramétre",
                type : "string",
                },
            Parametre2: {
                title: "Premier paramétre",
                type : "string",
            },
            
            },
        },
            message: {
                title: "Message à afficher",
                type: "string",
                enum: rules.rules,
            },
        },
    }
}

/*category2: {
    title: "Deuxiéme Champs",
},
number2: {
    title: "Zone",
    type: "array",
    items: {
        type: "string",
    },
},
Pos2: {
    title: "Position",
    type: "string",
    enum: ["[]", "[9,13]","[13,17]","[0,4]","[0,2]"],
},*/
