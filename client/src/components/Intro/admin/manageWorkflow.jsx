import useEth from "../../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function ManageWorkflow() {
  const { state: { accounts, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);

  const description = [
    "Inscription",
    "Propositions",
    "Fin des propositions",
    "Ouverture des votes",
    "Fermeture des votes",
    "Fin des haricots"
  ]
  
  useEffect(() => {
    // Display WorkflowStatus
    async function getWorkflowStatus() {
      if (artifact) {
        const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(parseInt(status));
      }
    }
    getWorkflowStatus();
  }, [accounts, contract, artifact]);

  let desc = description[workflowStatus];
  console.log(desc);

  return (
    <div><center>
      <table className="table_workflow">
      <thead>
        <tr>
          <td className="table_workflowCell">{description[0]}</td>
          <td className="table_workflowCell">{description[1]}</td>
          <td className="table_workflowCell">{description[2]}</td>
          <td className="table_workflowCell">{description[3]}</td>
          <td className="table_workflowCell">{description[4]}</td>
          <td className="table_workflowCell">{description[5]}</td>
        </tr>
      </thead>
      </table>
      </center>
    </div>
  );
}

export default ManageWorkflow;
