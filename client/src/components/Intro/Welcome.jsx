import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function Welcome() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState();

  // Display WorkflowStatus
  useEffect(() => {
      async function getWorkflowStatus() {
        if (artifact) {
          const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
          setWorkflowStatus(parseInt(status));
          console.log(workflowStatus);
        }
      }
      getWorkflowStatus();
  });

  return (
    <div>
      <h1>👋 Welcome to the Voting Dapp</h1>
      {contract 
      ? <p> You are connected with this address : {accounts} </p>
      : <p> Veuillez vous connecter sur le bon reseau.</p>
      }

      <p> WorkflowStatus : {workflowStatus} </p>

      {isOwner
        ? 'You are : Owner'
        : ''
      }

    </div>
  );
}

export default Welcome;
