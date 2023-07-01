import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function DisplayWinningProposal() {
  const { state: { contract, accounts } } = useEth();
  const [winProposalId, setWinProposalId] = useState();
  const [descriptWinningProposal, setDescriptWinningProposal] = useState();
  const [nbVote, setNbVote] = useState();

  // Recuperation des events
  useEffect (() => {
    async function getListProposals() {
      const winId = await contract.methods.winningProposalID().call({ from: accounts[0] });
      if (winId) {
        const descriptWinId = await contract.methods.getOneProposal(parseInt(winId)).call({ from: accounts[0] });
        setDescriptWinningProposal(descriptWinId[0]);
        setNbVote(descriptWinId[1]);
      }
      setWinProposalId(winId);
    }

    getListProposals();
  }, [contract, accounts])

  console.log("winProposalId value : " + winProposalId);
  console.log("descriptWinningProposal value : " + descriptWinningProposal);
  console.log("nbVote value : " + nbVote);

  return (
    <div>
        <p>La victoire pour : {winProposalId} - {descriptWinningProposal}</p>
        <center><table className="listeVoters">
          <thead>
            <tr>
              <th className="th-titre" colspan="3">GAGNANT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-addr">ID</td>
              <td className="td-addr">Description</td>
              <td className="td-addr">Votes</td>
            </tr>
            <tr>
              <td className="td-addr">{winProposalId}</td>
              <td className="td-addr">{descriptWinningProposal}</td>
              <td className="td-addr">{nbVote}</td>
            </tr>
          </tbody>
        </table>
        </center>
    </div>
  );
}

export default DisplayWinningProposal;
