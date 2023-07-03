# Projet 3 - Système de vote : Binome Charly et Maxime

La VotingBox est une application décentralisée (DAPP) qui permet de voter pour élire le plus beau modèle de Ferrari.

Pour être ajouter à la whitelist, il faut envoyer, au propriétaire du contrat, un certains montant d'ETH correspondant au code du concours.

Le propriétaire reçoit le montant correspondant au code du concours et rajoute l'adresse de la personne qui a envoyé les fonds à la whitelist.

La whitelist vote et élit le plus beau modèle.

Un tirage au sort est effectué parmi ceux qui ont élu le plus beau modèle et le gagnant reçoit 75% des ETH reçus pour participer à ce vote.

# Publication

Nos Vidéos de démo :
- Full (Maxime) : [Full Démo](https://www.loom.com/share/ec24a62f6f3f44208c2a376726ce11b9?sid=d05e3338-d264-4e2c-809a-f9a053eb3792)
- Partie 1 (Charly) : [Démo Part1](https://www.loom.com/share/d59dab984b0a4e82a6a8c95d7b6c1a0b?sid=b7c8901e-a25b-4d3f-b81d-a04ef4ba8de4)
- Partie 2 (Charly) : [Démo Part2](https://www.loom.com/share/a42ec549b1bf4706ac03181f12360272?sid=8f7b9672-6dd4-4131-8108-0756ff9da10f)

Notre DAPP en live (Vercel ) : https://projet3-wine.vercel.app/

    => Pré-requis : utiliser un navigateur avec le plugin Metamask sinon page blanche
    => Merci @Igor pour nous avoir indiquer les bugs rencontrés dans [Vercel](https://vercel.com/) lors du déploiement de projets "OUTPUT DIRECTORY: buil" => OVERRIDE

Contrat Goerli : https://goerli.etherscan.io/address/0xF67Ce2BA06B904DC72C224D10dC51176117d66d7

# Outils utilisés : 

* Truffle v5.9.2
* Ganache v7.8.0
* Solidity v0.5.16
* Node v16.16.0
* Web3.js v1.10.0
* Truffle Box React (All in One) => Installation : truffle unbox react

 * Vercel (https://vercel.com/) : pour la publication de la Dapp via Github
 * Loom (https://www.loom.com/) pour les vidéos de démo
 * Blockhain network de test : GOERLI

# Choix des technologies : 

Nous avons choisi la Truffle Box React car : 
- c'est l'outil qui est abordé dans les cours en ligne
- le plus simple à utiliser pour nous
- nous n'avons pas eu le temps à nous consacrer à utiliser Hardhat

# Modifications du contrat Voting.sol :

Nous avons modifié/ajouté :
 - le contrat pour prendre en compte la faille DOS dans la fonction tallyVotes() (Boucle)
 - la fonction getOneProposal() pour permettre à tout le monde de voir le résultat en fin de vote (Voir spécifications du projet ci-dessous)
 - les NatSpec

 # Points d'amélioration :

 - dans le tableau de la liste des Voteurs, une colonne hasVoted (Permet de cloturer les votes si besoin)
 - dans le tableau de la liste des Propositions, un colonne avec le nombre de votes (voteCount)
 - remonter les composanst dans une architecture moins profonde => simplifier l'architecture des dossiers et fichiers
 - ajouter des effets aux différents boutons, des images, un background...

# Spécifications
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

# Captures écrans

<img src="/img/VotingBox_VisitorFin.png" alt="VotingBox Visiteur Fin de vote">
<img src="/img/VotingBox_AdminFin.png" alt="Admin Console">



