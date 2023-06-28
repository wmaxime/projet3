import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

function GetVoters() {
  const { state: { accounts, contract } } = useEth();
  const [address, setAddress] = useState();
  //const [isVoter, setisVoter] = useState();

  //Set Value on Input Event
  const handleChange = event => {
    setAddress(event.target.value);
    console.log(address);
  };

  // Set Value on Click Button
  const handleClick = async (event) => {
    if (address === "") {
      alert("Please enter an address");
      return;
    }
    //const getVoter = await contract.methods.getVoter(address).send({ from: accounts[0] });
    //setisVoter(getVoter.isRegistered);
    console.log(event.target.value);
  };

  return (
    <div>
        <p>Check if address is a registred Voter (Only Voters can check)</p>
        <input type="text" id="" size="50" placeholder="Example : 0xABCDE123456..." onChange={handleChange}/>&emsp;
        <button onClick={handleClick}>Check address</button>
    </div>
  );
}

export default GetVoters;
