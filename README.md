# Projet - Système de vote 3 : Binome Charly et Maxime

La VotingBox est une application décentralisée (DAPP) qui permet de voter pour élire le plus beau modèle de Ferrari.

Pour être ajouter à la whitelist, il faut envoyer, au propriétaire du contrat, un certains montant d'ETH correspondand au code du concours.
Le propriétaire recçoit le montant correspondant au code du concours et rajoute l'adresse de la personne qui a envoyé les fonds à la whiteliste.
La whiteliste vote et élit le plus beau modèle.
Un tirage au sort est effectué parmi ceux qui ont élu le plus beau modèle et le gagnant reçoit 75% des ETH reçus pour participer à ce vote.

**********************************************************************************************************************************************

Nos Vidéos de démo : URL LINK EN COURS

Notre DAPP en live (Vercel ) : https://projet3-wine.vercel.app/

    => Pré-requis : utiliser un navigateur avec Metmask sinon page blanche
    => Merci @Igor pour nous avoir indiquer les bugs rencontrés lors du déploiement de projets "OUTPUT DIRECTORY: buil" => OVERRIDE

**********************************************************************************************************************************************

# Outils utilisés : 

* Truffle v5.9.2
* Ganache v7.8.0
* Solidity v0.5.16
* Node v16.16.0
* Web3.js v1.10.0
* Truffle Box React => Installation : truffle unbox react

 * Vercel : pour la publication de la Dapp via Github
 * Loom (https://www.loom.com/) pour les vidéos de démo
 * Blockhain network de test : GOERLI

# Choix des technologies : 

Nous avons choisi la Truffle Box car : 
- c'est l'outil qui est abordé dans les cours en ligne
- le plus simple à utiliser pour nous
- nous n'avons pas eu le temps à nous consacrer à utiliser Hardhat

# Modifications du ontrat Voting.sol :

Nous avons modifié :
 - le contrat pour prendre en compte la faille DOS dans la fonction tallyVotes() (Boucle)
 - la fonction getOneProposal() pour permettre à tout le monde de voir le résultat en fin de vote (Voir spécifications du projet ci-dessous)

 # Reste à faire :

 - dans le tableau de la liste des Voteurs, une colonne hasVoted (Permet de cloturer les votes si besoin)
 - dans le tableau de la liste des Propositions, un colonne avec le nombre de votes (voteCount)
 - remonter les composanst dans une architecture moins profonde
 - ajouter des effets aux différents bouton, du graphisme...

## Spécifications
## Votre Dapp doit permettre : 

* l’enregistrement d’une liste blanche d'électeurs.
* à l'administrateur de commencer la session d'enregistrement de la proposition.
* aux électeurs inscrits d’enregistrer leurs propositions.
* à l'administrateur de mettre fin à la session d'enregistrement des propositions.
* à l'administrateur de commencer la session de vote.
* aux électeurs inscrits de voter pour leurs propositions préférées.
* à l'administrateur de mettre fin à la session de vote.
* à l'administrateur de comptabiliser les votes.
* à tout le monde de consulter le résultat.

### NOTRE PROJET

