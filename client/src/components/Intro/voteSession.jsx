import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect} from "react";
import DisplayListProposals from "./displayListProposals";

function VoteSession() {
  const { state: { accounts, contract } } = useEth();
  const [choice, setChoice] = useState();
  const [ListProposals, setListProposals] = useState([]);
  const [isVoter, setIsVoter] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [registeredChoice, setRegisteredChoice] = useState();

  // Recuperation des events
  useEffect (() => {
    async function getListProposals() {
      // recuperation depuis les events
      const ListProposalsEvent = await contract.getPastEvents(
        "ProposalRegistered",
        {
          fromBlock: 0,
          toBlock: "latest",
        }
      );
      // Recuperation des Proposals ID pour pourvoir requeter les Descriptions ensuites
      let proposalsId = ListProposalsEvent.map((proposal) => proposal.returnValues.proposalId);
      //setListProposalsID(proposalsId); // => ça ne marche pas de recuperer via useState ListProposalsID pour l'utiliser à l'intérieur de la fonction, il faut utiliser proposalsId
      //console.log(proposalsId);
      
      let arrProposals = [];
      for (const ID of proposalsId) { // Foreach ne marche pas aussi
          const data = await contract.methods.getOneProposal(parseInt(ID)).call({ from: accounts[0] });
          arrProposals.push({
            id: ID,
            description: data.description,
            voteCount: data.voteCount,
          });
      }    
      setListProposals(arrProposals);
    }

    async function checkVoterStatus() {
      let events = await contract.getPastEvents("VoterRegistered", { fromBlock: 0, toBlock: "latest" });
      let voter = events.find((voter) => voter.returnValues.voterAddress === accounts[0]);
      //console.log(voter);
      if (voter) {
          let status = await contract.methods.getVoter(voter.returnValues.voterAddress).call({ from: accounts[0] });
          console.log("status : " + status[1]); // isRegistered = 0, hasVoted = 1, votedProposalId = 2

          if (status[0] === true) {
            setIsVoter(true);
          }
          if (status[1] === true) {
            setHasVoted(true);
          }
          if (status[2] > 0) {
            setRegisteredChoice(status[2]);
          }
      }
    }

    getListProposals();
    checkVoterStatus();

  }, [contract, accounts])

  //console.log(ListProposals.length);

  const handleSubmit = event => {
    event.preventDefault();
    // 👇️ clear all input values in the form
    event.target.reset();
  };

  //Set Value on Input Event
  const handleChange = event => {
    setChoice(event.target.value);
    console.log("Choice : " + event.target.value);
  };

    // Set Value on Click Button
    const handleClick = async (event) => {
      event.preventDefault(); // Prevent refresh page to not clear INPUT
      if (choice === "" || !choice ) {
        alert("Please choose a proposal");
        return;
      }

      if (choice > ListProposals.length)
      {
        alert("Please choose a proposal between 1 to " + ListProposals.length);
        return;
      }

      if (hasVoted)
      {
        alert("You already voted !");
        return;       
      }
      console.log(choice);
      await contract.methods.setVote(choice).send({ from: accounts[0] });
      window.location.reload();
    };

  return (
    <div>
      {isVoter && !hasVoted
      ? (<> <form onSubmit={handleSubmit}>
        <div>
        <p>Faite un choix : </p>
        <input type="text" size="50" placeholder="Choisir un ID" onChange={handleChange} /> &emsp;
        <button onClick={handleClick} type="submit">Voter</button>
        </div>
      </form><br></br>
      <DisplayListProposals /> </>)
      : ''
      }

      {hasVoted
        ? (<>  <p>Vous avez voté pour le choix : {registeredChoice}</p>
                <DisplayListProposals /> </>)
        : ''
      }
    </div>
  );
}

export default VoteSession;
