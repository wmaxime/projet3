import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import Menu from "./menu";
import AddProposal from "./vote/addProposal";
import DisplayListProposals from "./display/displayListProposals"; 
import GetVoters from "./utils/GetVoters";
import VoteSession from "./vote/voteSession";
import DisplayWinningProposal from "./display/displayWinningProposal";
import Logo from "./img/Logo.png";
import MessageVisitor from "./display/messageVisitor";
import MessageAccueil from "./display/messageAccueil";
import MessageAttente from "./display/messageAttente";
import MessageAttenteResultat from "./display/messageAttenteResultat"

function Welcome() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [userAddress, setUserAddress] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState(0);
  const [isVoter, setIsVoter] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // calcul short address to display
  useEffect(() => {
    const updateUserAddress = () => {
        if(accounts !== null) {
            setUserAddress(accounts[0]);
        }        
    }
    updateUserAddress();
    //console.log("userAddress value :" + userAddress);

    // refresh de page si changement de compte ou Network dans Metamask 
    if(window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
  }, [accounts, userAddress]);

  //let shortAdd = (userAddress.substring(0, 5) + "....." + userAddress.substring(37));
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
      const events = await contract.getPastEvents("VoterRegistered", { fromBlock: 0, toBlock: "latest" });
      //console.log("events : " + events);
      //console.log("Nb events : " + events.length);
      let voter = events.find((voter) => voter.returnValues.voterAddress === accounts[0]);
      //console.log("checkVoterStatus voter value : " + voter);
      if (voter) {
          let status = await contract.methods.getVoter(voter.returnValues.voterAddress).call({ from: accounts[0] });
          //console.log("event voter status value : " + status); // isRegistered = 0, hasVoted = 1, votedProposalId = 2

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
      <center><h1><img src={Logo} alt="Logo" width="18"></img> Election de la plus belle Ferrari</h1></center>
      <Menu />

      {!artifact 
        ? <p className="p_alert"> Veuillez vous connecter sur Metamask !</p>
        : ''
      }
      {!contract 
        ? <p className="p_alert"> Veuillez vous connecter sur le bon reseau Metamask !</p>
        : ''
      }

      {!isVoter && !isOwner && workflowStatus === 0
        ? <MessageVisitor />
        : ''
      }

      {isVoter && workflowStatus === 0
        ? (<> <MessageAccueil /> </>)
        : ''
      }

      {isVoter && workflowStatus === 1
        ? (<> <AddProposal />
          <DisplayListProposals /> </>)
        : ''
      }

      {isVoter && workflowStatus === 2
        ? (<> <MessageAttente /> </>)
        : ''
      }

      {isVoter && workflowStatus === 3
        ? <VoteSession />
        : ''
      }

      {isVoter && workflowStatus === 4
        ? <MessageAttenteResultat />
        : ''
      }

      { workflowStatus === 5
        ? <DisplayWinningProposal /> : ''
      }

      {isVoter && !isOwner
        ? <GetVoters />
        : ""
      }
    </>
  );
}

export default Welcome;
