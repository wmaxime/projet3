import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import AddVoters from "./addVoters";
import GetVoters from "./GetVoters";
import ManageWorkflow from "./admin/manageWorkflow";
import NextWorkflow from "./admin/nextWorkflow";
import DisplayListVoters from "./displayListVoters";
import DisplayListProposals from "./displayListProposals";

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
      
      {workflowStatus < 2
        ? <DisplayListVoters />
        : ''
      }
      
      {workflowStatus < 3
        ? <DisplayListProposals />
        : ''
      }

      {workflowStatus > 6
        ? <DisplayListProposals />
        : ''
      }
    </div>
  );
}

export default Admin;
