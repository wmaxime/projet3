import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";

function MessageVisitor() {
    const { state: { contract, artifact } } = useEth();
    //const [isVoter, setIsVoter] = useState(false);
    const [ displayOwner, setDisplayOwner] = useState();

   useEffect(() => {
        async function getOwner() {
          if (artifact) {
            let contractOwner = await contract.methods.owner().call();
            setDisplayOwner(contractOwner);
          }
        }
        getOwner();
      }, [contract, artifact]);
    
      console.log(displayOwner);

    return (
        <div>
            <p>Bienvenur Visiteur, </p>
            {/* <p>Si vous souhaitez voter pour la plus belle Ferrari, veuillez vous inscrire auprès de : {displayOwner}</p> */}
            <p>Si vous êtes l'heureux propriétaire d'une Ferrari (+ son NFT) et possédez de la crypto monnaie, vous êtes potentiellement éligible pour participer à ce vote en ligne.</p>
            <p>Pour vous inscrire, veuillez envoyer 0,007859 ETH (Valeur précise correspondant au code concours) à l'adresse du gestionnaire : {displayOwner} et bien sûre à partir de votre portefeuille possédant le NFT de votre Ferrari.</p>
            <p>Vous serez automatiquement inscrit après vérification de votre protefeuille.</p>
        </div>
    );
}

export default MessageVisitor;