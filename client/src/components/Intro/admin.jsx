import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import AddVoters from "./addVoters";
import GetVoters from "./GetVoters";
import DisplayWorkflow from "./displayWorkflow";
import ChangeWorkflow from "./changeWorkflow";
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
          <h1>Admin Only</h1>
          </div>
        : ''
      }

      <DisplayWorkflow />
      <ChangeWorkflow />
      
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
    </div>
  );
}

export default Admin;
