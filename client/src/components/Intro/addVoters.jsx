import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function AddVoters() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);
  const [address, setAddress] = useState();
  const [isVoter, setisVoter] = useState();

  // Check if isVoter
  async function checkIsVoter(addr)  {
    await contract.methods
    .getVoter(addr)
    .call({ from: accounts[0] })
    .then((results) => {
      setisVoter(results.isRegistered);
      //console.log(results.isRegistered);
      //console.log("isVoter value : " + isVoter);
    })
    .catch((err) => alert(err));
  };

  // Display WorkflowStatus
  useEffect(() => {
    async function getWorkflowStatus() {
      if (artifact) {
        const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(parseInt(status));
      }
    }
    getWorkflowStatus();
  }, [accounts, contract, artifact]);

  const handleSubmit = event => {
    event.preventDefault();
    // 👇️ clear all input values in the form
    event.target.reset();
  };

  //Set Value on Input Event
  const handleChange = event => {
    setAddress(event.target.value);
    console.log("AddVoters : " + event.target.value);
    checkIsVoter(event.target.value);
    setisVoter();
  };

    // Set Value on Click Button
    const handleClick = async (event) => {
      event.preventDefault(); // Prevent refresh page to not clear INPUT
      if (address === "") {
        alert("Please enter an address");
        return;
      }

      // Check if isVoter
      checkIsVoter(address);
      if (isVoter === true)  {
        console.log("already resistred :" + address);
        alert("Address already registered !");
      }
      else {
      await contract.methods.addVoter(address).send({ from: accounts[0] });
      window.location.reload(false);
      };

    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
    {isOwner && workflowStatus === 0
      ? <div>
        <p>Register Voter : </p>
        <input type="text" size="50" placeholder="Example : 0xABCDE123456..." onChange={handleChange} /> &emsp;
        <button onClick={handleClick} type="submit">Add Voter address</button>
        {isVoter === true
          ? <p>Address is already Voter : <font color="red"> {address} </font></p>
          : ''
        }
        </div>
      : ''
    }
    </form>
    </div>
  );
}

export default AddVoters;
