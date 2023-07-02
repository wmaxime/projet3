import useEth from "../../../contexts/EthContext/useEth";
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

  //console.log("winProposalId value : " + winProposalId);
  //console.log("descriptWinningProposal value : " + descriptWinningProposal);
  //console.log("nbVote value : " + nbVote);

  return (
    <div><hr className="hr_page"/>
        <p>Le modèle préféré des propriétaires de Ferrari est : <font color="red" size="6">{descriptWinningProposal}</font></p>
        <center><table className="listeVoters">
          <thead>
            <tr>
              <th className="th-titre" colSpan="3">GAGNANT</th>
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
        <p>Un tirage au sort des propriétaires ayant voté pour ce modèle sera effectué afin de reverser 75% des fonds récoltés <font size="1">(* Voir conditions)</font>.</p>
        <p className="p-condition">* Désolé pas de fonction retrait dans le smart contract.</p>
    </div>
  );
}

export default DisplayWinningProposal;
