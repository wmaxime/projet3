import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function DisplayListProposals() {
  const { state: { contract } } = useEth();
  const [ListProposals, setListProposals] = useState([]);

  // Recuperation des events
  useEffect (() => {
    async function getListProposals() {
      // recuperation des voters depuis les events
      const ListProposalsEvent = await contract.getPastEvents(
        "ProposalRegistered",
        {
          fromBlock: 0,
          toBlock: "latest",
        }
      );
      // creation du tableau avec MAP (Merci console.log)
      let proposalsId = ListProposalsEvent.map((proposal) => proposal.returnValues.proposalId);
      // Register Events
      setListProposals(proposalsId);
    }

    getListProposals();

  }, [contract])

//  console.log(ListVoters);
//  console.log(ListVoters.length);

  return (
    <div>
  
       <center><table className="listeVoters">
            <thead>
              <tr>
                <th class="th-titre">Propositions : {ListProposals.length}</th>
              </tr>
            </thead>
            <tbody>
              {ListProposals.map((item) => (
                <tr key={item}>
                  <td class="td-addr">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
    
    </div>
  );
}

export default DisplayListProposals;
