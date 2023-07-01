import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect} from "react";

function VoteSession() {
  const { state: { accounts, contract } } = useEth();
  const [choice, setChoice] = useState();
  const [ListProposals, setListProposals] = useState([]);

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

    getListProposals();

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
      console.log(choice);
      await contract.methods.setVote(choice).send({ from: accounts[0] });
      window.location.reload();
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <p>Faite un choix : </p>
        <input type="text" size="50" placeholder="Choisir un ID" onChange={handleChange} /> &emsp;
        <button onClick={handleClick} type="submit">Voter</button>
        </div>
      </form>
    </div>
  );
}

export default VoteSession;
