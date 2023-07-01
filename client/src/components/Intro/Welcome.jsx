import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import AddProposal from "./addProposal";
import DisplayWorkflow from "./displayWorkflow";
import DisplayListProposals from "./displayListProposals"; 
import GetVoters from "./GetVoters";
import VoteSession from "./voteSession";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import DisplayWinningProposal from "./displayWinningProposal";

function Welcome() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [userAddress, setUserAddress] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState(0);
  const [isVoter, setIsVoter] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  //const [shorrtAdd, setshorrtAdd] = useState();

  // calcul short address to display
  useEffect(() => {
    const updateUserAddress = () => {
        if(accounts !== null) {
            setUserAddress(accounts[0]);
        }        
    }
    updateUserAddress();

    // refresh de page si changement de compte ou Network dans Metamask 
    if(window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
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

    async function checkVoterStatus() {
      let events = await contract.getPastEvents("VoterRegistered", { fromBlock: 0, toBlock: "latest" });
      console.log("events : " + events);
      console.log("Nb events : " + events.length);
      let voter = events.find((voter) => voter.returnValues.voterAddress === accounts[0]);
      //console.log(voter);
      if (voter) {
          let status = await contract.methods.getVoter(voter.returnValues.voterAddress).call({ from: accounts[0] });
          console.log("status : " + status); // isRegistered = 0, hasVoted = 1, votedProposalId = 2

          if (status[0] === true) {
            setIsVoter(true);
          }
          if (status[1] === true) {
            setHasVoted(true);
          }
      }
    }

    getWorkflowStatus();
    checkVoterStatus();

  }, [accounts, contract, artifact]);

console.log("Acount hasVoted : " + hasVoted);

  return (
    <>
      {!artifact ? <NoticeNoArtifact /> :
        !contract ? <NoticeWrongNetwork /> : ''
      }
      <h1>👋 Welcome to the Voting Dapp</h1>
      {!isOwner && isVoter
        ? <DisplayWorkflow /> :''
      }
      {contract 
      ? <p> You are connected with this address : {shortAdd} </p>
      : <p> Veuillez vous connecter sur le bon reseau.</p>
      }

      {isOwner
        ? 'You are : Owner' : ''
      }

      {isVoter
        ? <GetVoters />
        : "Welcome Guest"
      }

      {isVoter && workflowStatus === 1
        ? (<> <AddProposal />
          <DisplayListProposals /> </>)
        : ''
      }

      {isVoter && workflowStatus === 3
        ? <VoteSession />
        : ''
      }

      {isVoter && workflowStatus === 5
        ? <DisplayWinningProposal /> : ''

      }

    </>
  );
}

export default Welcome;
