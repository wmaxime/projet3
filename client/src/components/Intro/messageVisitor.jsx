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
            <p>Si vous souhaitez voter pour la plus belle Ferrari, veuillez vous inscrire auprès de : {displayOwner}</p>
        </div>
    );
}

export default MessageVisitor;