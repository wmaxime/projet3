import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function AddProposal() {
  const { state: { accounts, contract } } = useEth();
  const [proposal, setProposal] = useState();
  const [isVoter, setisVoter] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    // 👇️ clear all input values in the form
    event.target.reset();
  };

  //Set Value on Input Event
  const handleChange = event => {
    setProposal(event.target.value);
    console.log("Proposal : " + event.target.value);
    //checkIsVoter(event.target.value);
    setisVoter();
  };

    // Set Value on Click Button
    const handleClick = async (event) => {
      event.preventDefault(); // Prevent refresh page to not clear INPUT
      await contract.methods
        .addProposal(proposal)
        .send({ from: accounts[0] })
        .catch((err) => alert(err))
      //window.location.reload(false);
    };
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
       <div>
        <p>Faites votre proposition : </p>
        <input type="text" size="50" onChange={handleChange} /> &emsp;
        <button onClick={handleClick} type="submit">Valider</button>
        {isVoter === true
          ? <p><font color="red">Vous avez déjà voter !!!</font></p>
          : ''
        }
        </div><br></br>
      </form>
    </div>
  );
}

export default AddProposal;
