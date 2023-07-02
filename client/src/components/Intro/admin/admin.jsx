import useEth from "../../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import AddVoters from "./addVoters";
import GetVoters from "../utils/GetVoters";
import ManageWorkflow from "./manageWorkflow";
import NextWorkflow from "./nextWorkflow";
import DisplayListVoters from "../display/displayListVoters";
import DisplayListProposals from "../display/displayListProposals";

function Admin() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);


  // Display WorkflowStatus
  useEffect(() => {
      async function getWorkflowStatus() {
        if (artifact) {
          const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
          setWorkflowStatus(parseInt(status));
          //console.log(workflowStatus);
        }
      }
      getWorkflowStatus();
  }, [accounts, contract, artifact]);

  return (
    <div>
      {isOwner // Affiche le menu Admin si isOwner
        ? <div>
          <h1>Console de gestion des votes :</h1>
          </div>
        : ''
      }
      <br></br>
      <ManageWorkflow />
      <NextWorkflow />
      
      {isOwner && workflowStatus === 0 // Affiche le menu AddVoters si isOwner et bon WorkflowStatus
        ? <AddVoters />
        : ''
      }
    
      <GetVoters />
      <DisplayListVoters />

      {workflowStatus < 6
        ? <DisplayListProposals />
        : ''
      }
      <p></p>
    </div>
  );
}

export default Admin;
