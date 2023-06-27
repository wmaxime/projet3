import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function Welcome() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);

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
    <div className="welcome">
      <h1>👋 Welcome to the Voting Dapp</h1>
      <p>
        You are connected with this address : {accounts}
      </p>
      {isOwner
        ? 'You are : Owner'
        : 'You are : Not Owner'
      }
      <p>
        WorkflowStatus : {workflowStatus}
      </p>
    </div>
  );
}

export default Welcome;
