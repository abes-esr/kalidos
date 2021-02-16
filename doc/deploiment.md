## Historique de l'intervention

> mise a jour de la configuration du proxy pour docker pour acceder au repot de la forge

![](./screen/img1.png)

> installation de docker compose

## Guide du deploiment 

### mode automatique 

Le deploiment a été automatisé grace a Gitlab CI, qui construit l'image de l'application avant de la deployer sur la machine virtuelle.
Ainsi il suffit de relancer une pipeline sur le projet pour redeployer l'application ou si il y a besoin de mettre a jour une nouvelle version de celle ci sur la machine.

### mode manuel

> se connecter a la machine 
```
ssh scdetudiant@192.168.244.38
```

> relancer l'application
```
cd projet_bu
docker-compose up -d
```