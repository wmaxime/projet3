import useEth from "../../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";

function MessageAttenteResultat() {
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
            <p>La période pour élire votre modèle préféré est terminée.</p>
            <p>Veuillez patienter jusqu'à la publication des résultats.</p>
        </div>
    );
}

export default MessageAttenteResultat;