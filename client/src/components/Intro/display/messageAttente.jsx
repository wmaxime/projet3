import useEth from "../../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";

function MessageAttente() {
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
            <p>Heureuse et Heureux Propriétaires de Ferrari, </p>
            {/* <p>Si vous souhaitez voter pour la plus belle Ferrari, veuillez vous inscrire auprès de : {displayOwner}</p> */}
            <p>La période pour proposer vos modèles de Ferrari est terminée.</p>
            <p>Veuillez patienter jusqu'à l'ouverture de la période d'élection de la plus belle Ferrari.</p>
        </div>
    );
}

export default MessageAttente;