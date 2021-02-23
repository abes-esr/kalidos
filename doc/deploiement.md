## Historique de l'intervention

> mise à jour de la configuration du proxy pour docker pour accéder au dépôt de la forge

![](./screen/img1.png)

> installation de docker compose

## Guide du déploiement 

### Mode automatique 

Le déploiement a été automatisé grâce à Gitlab CI, qui construit l'image de l'application avant de la déployer sur la machine virtuelle.
Ainsi il suffit de relancer une pipeline sur le projet pour redéployer l'application ou si il y a besoin de mettre à jour une nouvelle version de celle-ci sur la machine.

Ce type de déploiment permet de redéployer complétement l'application depuis la dernière version disponible sur le Git. L'utilisateur perdra ses données, c'est une remise à zero totale de l'application.

### Mode manuel

> se connecter a la machine 
```
ssh scdetudiant@192.168.244.38
```

> relancer l'application
```
cd projet_bu
docker-compose up -d
```

Ces commandes permettent de relancer l'application si celle-ci a été stoppée, par exemple après une mise à jour de l'openstack où la machine virtuelle est hebergée. Aucun impact sur les données de l'utilisateur dans ce mode.
