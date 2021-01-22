#python3 refaireIndexRegles.py 
#Ne pas oublier de rename les fichiers après le script
import json

#On récupère les règles
modelReglesJson = {}
with open('serveur/public/model_regles_tries.json') as f:
    modelReglesJson = json.load(f)

#On refait l'index de toutes les règles
compteur = 1
for typeDocument in modelReglesJson:
    ensembleDeTypesDeRegles = modelReglesJson[typeDocument]
    for typeRegles in ensembleDeTypesDeRegles:
        ensembleDeRegle = ensembleDeTypesDeRegles[typeRegles]
        for regle in ensembleDeRegle:
            regle["index"] = compteur
            compteur += 1

#On enregistre ça dans un fichier
with open('serveur/public/model_regles_tries_2.json', 'w', encoding='utf-8') as json_file:
    json.dump(modelReglesJson, json_file, indent=4, ensure_ascii=False)
