import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function AddVoters() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);
  const [address, setAddress] = useState();


  // Display WorkflowStatus
  useEffect(() => {
    async function getWorkflowStatus() {
      if (artifact) {
        const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(parseInt(status));
      }
    }
    getWorkflowStatus();
  });

  //Set Value on Input Event
  const handleChange = event => {
    setAddress(event.target.value);
    console.log("AddVoters : " + event.target.value);
  };

    // Set Value on Click Button
    const handleClick = async (event) => {
      event.preventDefault();
      if (address === "") {
        alert("Please enter an address");
        return;
      }
      await contract.methods.addVoter(address).send({ from: accounts[0] });
      window.location.reload(false);
    };

  return (
    <div>
    {isOwner && workflowStatus === 0
      ? <div>
        <p>Register Voter : </p>
        <input type="text" size="50" placeholder="Example : 0xABCDE123456..." onChange={handleChange}/>&emsp;
        <button onClick={handleClick}>Add Voter address</button>
        </div>
      : ''
    }
    </div>
  );
}

export default AddVoters;
