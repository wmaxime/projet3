import useEth from "../../../contexts/EthContext/useEth";
//import { useState, useEffect } from "react";

function ManageWorkflow() {
  const { state: { accounts, contract } } = useEth();
  //const [workflowStatus, setWorkflowStatus] = useState(0);

  const description = [
    "Inscription",
    "Propositions",
    "Fin des propositions",
    "Ouverture des votes",
    "Fermeture des votes",
    "Fin des haricots"
  ]

/*  useEffect(() => {
    // Display WorkflowStatus
    async function getWorkflowStatus() {
      if (artifact) {
        const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(parseInt(status));
      }
    }
    getWorkflowStatus();
  }, [accounts, contract, artifact]);
*/

  //let desc = description[workflowStatus];
  //console.log(desc);

/*   // Set Value on Click Button
   const handleClick = async (event) => {
    //event.preventDefault(); // Prevent refresh page to not clear INPUT
    switch (workflowStatus) {
      case 0:
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        break;
      
      case 1:
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        break;

      case 2:
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        break;
      
      case 3:
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        break;

      case 4:
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        console.log(workflowStatus)
        break;
      
      default: break;
    }
    window.location.reload(true);
  };
*/

  const startProposalsRegistering = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] })
    window.location.reload();
  };
  const endProposalsRegistering = async () => {
    await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
    window.location.reload();
  };
  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
    window.location.reload();
  };
  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
    window.location.reload();
  };
  const tallyVotes = async () => {
    await contract.methods.tallyVotes().send({ from: accounts[0] });
    window.location.reload();
  };

  return (
    <div><center>
      <table className="table_workflow">
      <thead>
        <tr>
          <td className="table_select">Clickez sur une étape :</td>
          <td className="table_workflowCell">{description[0]}</td>
          <td className="table_workflowCell" onClick={startProposalsRegistering}>{description[1]}</td>
          <td className="table_workflowCell" onClick={endProposalsRegistering}>{description[2]}</td>
          <td className="table_workflowCell" onClick={startVotingSession}>{description[3]}</td>
          <td className="table_workflowCell" onClick={endVotingSession}>{description[4]}</td>
          <td className="table_workflowCell" onClick={tallyVotes}>{description[5]}</td>
        </tr>
      </thead>
      </table>
      </center>
    </div>
  );
}

export default ManageWorkflow;
