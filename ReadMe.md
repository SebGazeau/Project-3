# Alyra Test Voting

## Description repository
#### Racine 
À la racine il y a l'environnement lié au smartcontract, aux tests unitaires (en typescript) 
et un dossier `docs` pour la dApp.

### Pour faire une migration :
À la racine du projet :

`npm install`

`npm run typecheck`

suivi de :
- en local : `npm run migrate`
- reseau kovan : `npm run migrate-kovan`

Pour le reseau kovan ne pas oublier de créer un `.env` pour fournir les variables nécessaires.


### Pour utiliser la dApp
La partie dApp est réalisée en VueJs 3 Typescript avec une gestion de components, 
de store et de routing.
Une fois le clone terminé, rentrer dans le dossier  `docs` et lancer les commandes 

`npm install`

`npm run serve`

## Description de la dApp
L'application permet de gérer un système de session de vote. Chaque session de vote est divisée 
en 4 temps, enregistrement des participant·e·s, ajout de propostions (limité à 10 par session),
vote pour la propostion de son choix et la visualisation des résultats après calcul.
Deux profils sont distigués sur l'application admin et voter.
### Partie admin 
La partie administrateur est accessible uniquement par le compte qui a déployé 
le smartcontract.  
L'admin peut :
- créer de nouvelles sessions de vote
- ajouter un par un ou par lot les participant·e·s à une session
- retirer un par un ou par lot les participant·e·s à une session 
- changer le statut de la session de vote
- voir les propostions d'une session
### Partie voter
La partie pour les participant·e·s à une ou plusieurs sessions de vote.
Les personnes connectées à cette partie de l'application peuvent voir l'ensemble 
des sessions de vote. Par contre leurs actions sont limitées par leurs droits et
la phase de la session.  
Un·e participant·e peut :
- ajouter une proposition
- voter pour la propostion de son choix
- voir le ou les résultats d'une session

Lien : 
Deploiement : https://master.d2xcavd7zo6hv5.amplifyapp.com/
Video dApp : https://www.youtube.com/watch?v=cJVFzrOR8gY
Video Dev et CI/CD : https://youtu.be/iXsrqOwJk_A
