import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function ChangeWorkflow() {
  const { state: { accounts, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);

  const description = [
    "Inscription des voteurs",
    "Enregistrement des propositions",
    "Fin de l'enregistrement des propositions",
    "Ouverture des votes",
    "Fermeture des votes",
    "Résultats",
  ]

  // Display WorkflowStatus
  useEffect(() => {
    async function getWorkflowStatus() {
      if (artifact) {
        const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(parseInt(status));
      }
    }
    getWorkflowStatus();
  }, [accounts, contract, artifact]);

  let nextStep = description[workflowStatus + 1];
  //console.log(desc);

    // Set Value on Click Button
  const handleClick = async (event) => {
    //event.preventDefault(); // Prevent refresh page to not clear INPUT
    switch (workflowStatus) {
      case 0:
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        break;
      
      case 1:
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        break;

      case 2:
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        break;
      
      case 3:
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        break;

      case 4:
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        console.log(workflowStatus)
        break;
      
      default: break;
    }
    window.location.reload(true);
  };

  return (
    <form>
      {workflowStatus < 5
        ? <div>
          <p>Click to set next Workflow : <button type="submit" onClick={handleClick} >{nextStep}</button></p>
        </div>
        :''
      }
    </form>
  );
}

export default ChangeWorkflow;
