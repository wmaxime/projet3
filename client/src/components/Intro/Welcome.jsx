import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import AddProposal from "./addProposal";
import DisplayWorkflow from "./displayWorkflow";
//import DisplayListProposals from "./displayListProposals";

function Welcome() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [userAddress, setUserAddress] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState(0);
  //const [shorrtAdd, setshorrtAdd] = useState();

  // calcul short address to display
  useEffect(() => {
    const updateUserAddress = () => {
        if(accounts !== null) {
            setUserAddress(accounts[0]);
        }        
    }
    updateUserAddress();
  }, [accounts]);

  let shortAdd = (userAddress.substring(0, 5) + "....." + userAddress.substring(37));
  //console.log(shortAdd);

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
  //console.log(workflowStatus);

  return (
    <div>
      <h1>👋 Welcome to the Voting Dapp</h1>
      {!isOwner
        ? <DisplayWorkflow />
        :''
      }
      {contract 
      ? <p> You are connected with this address : {shortAdd} </p>
      : <p> Veuillez vous connecter sur le bon reseau.</p>
      }

      {isOwner
        ? 'You are : Owner'
        : ''
      }

      {workflowStatus === 1
        ? <AddProposal />
        : ''
      }

    </div>
  );
}

export default Welcome;
