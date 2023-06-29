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
    "Fin"
  ]

  //console.log(description);

  // Display WorkflowStatus
  useEffect(() => {
    async function getWorkflowStatus() {
      if (artifact) {
        const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(parseInt(status));
      }
    }
    getWorkflowStatus();
  });

  let desc = description[workflowStatus];
  //console.log(desc);

  return (
    <div>
        <p>Workflow actuel : {desc}</p>
    </div>
  );
}

export default ChangeWorkflow;
