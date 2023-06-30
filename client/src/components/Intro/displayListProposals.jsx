import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function DisplayListProposals() {
  const { state: { contract, accounts } } = useEth();
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

  //console.log(ListProposals);
  //console.log(ListProposals.length);

  return (
    <div>
       <center><table className="listeVoters">
            <thead>
              <tr>
                <th className="th-titre" colSpan="2">Nombre de propositions : {ListProposals.length}</th>
              </tr>
            </thead>
            <tbody>
              {ListProposals.map((item) => (
                <tr key={item.id}>
                  <td className="td-addr">{item.id}</td>
                  <td className="td-addr">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
    </div>
  );
}

export default DisplayListProposals;
