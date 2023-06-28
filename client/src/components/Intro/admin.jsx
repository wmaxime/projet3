import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function Admin() {
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
    <div>
    {isOwner
      ? <div>
        <h1>Admin Only</h1>
        </div>
      : ''
    }
    </div>
  );
}

export default Admin;
