import useEth from "../../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";

function MessageAccueil() {
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
            <p>Bienvenue Heureuse et Heureux Propriétaires de Ferrari, </p>
            {/* <p>Si vous souhaitez voter pour la plus belle Ferrari, veuillez vous inscrire auprès de : {displayOwner}</p> */}
            <p>Nous vous prions de bien vouloir patienter pendant la période d'inscription des participants.</p>
            <p>Pour patienter, vous pouvez vérifier si vos amis sont inscrits et s'ils ne le sont pas, les invités à s'inscrire.</p>

        </div>
    );
}

export default MessageAccueil;