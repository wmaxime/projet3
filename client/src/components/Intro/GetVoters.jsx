import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function GetVoters() {
  const { state: { accounts, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);

  // Check if Voter
  useEffect(() => {
      async function getWorkflowStatus() {
        if (artifact) {
          const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
          setWorkflowStatus(parseInt(status));
          console.log(workflowStatus);
        }
      }
      getWorkflowStatus();
  });

  return (
    <div>
        <p>Check if address is a registred Voter (Only Voters can check)</p>
        <input type="text" id="" size="50" placeholder="Example : 0xABCDE123456..."/>&emsp;
        <button>Check address</button>
    </div>
  );
}

export default GetVoters;
