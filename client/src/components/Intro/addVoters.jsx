import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function AddVoters() {
  const { state: { accounts, isOwner, contract, artifact } } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);
  const [address, setAddress] = useState();
  const [isVoter, setisVoter] = useState();
  const [nbVoters, setNbVoters] = useState(0);

  // Recuperation des events
  useEffect (() => {
    async function getListVoters() {
      // recuperation des voters depuis les events
      const listVotersEvent = await contract.getPastEvents(
        "VoterRegistered",
        {
          fromBlock: 0,
          toBlock: "latest",
        }
      );
      //console.log(listVotersEvent.length);
      setNbVoters(listVotersEvent.length);
    }

    getListVoters();
    //console.log("Nombre de voters : " + nbVoters);
    if (nbVoters === 0) {
      //alert("Admin doit s'enregistrer en tant que Voter pour pouvoir vérifier les  !");
    };

  }, [contract, nbVoters]);

  // Check if isVoter
  async function checkIsVoter(addr)  {
    await contract.methods
    .getVoter(addr)
    .call({ from: accounts[0] })
    .then((results) => {
      setisVoter(results.isRegistered);
      console.log("checkIsVoter value : " + results.isRegistered);
      console.log("isVoter value : " + isVoter);
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
    console.log("Handle AddVoters : " + event.target.value);
    if (nbVoters > 0) {
        checkIsVoter(event.target.value);
    }
    //setisVoter();
  };

    // Set Value on Click Button
    const handleClick = async (event) => {
      event.preventDefault(); // Prevent refresh page to not clear INPUT
      if (address === "") {
        alert("Please enter an address");
        return;
      }
      
      const newVoterAddr = address;
      console.log("newVoterAddr value : " + address);
      
      if (nbVoters > 0) {
        //checkIsVoter(newVoterAddr);
      }
        if (isVoter === true)  {
          console.log("already resistred :" + address);
          alert("Address already registered !");
          return;
        }
        else
        {
          await contract.methods.addVoter(newVoterAddr).send({ from: accounts[0] });
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
