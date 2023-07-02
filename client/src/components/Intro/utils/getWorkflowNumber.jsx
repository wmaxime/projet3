import useEth from "../../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function GetWorkflowNumber() {
  const { state: { accounts, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);

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

  //console.log("Etape : " + workflowStatus);

  return ( workflowStatus );
}

export default GetWorkflowNumber;
