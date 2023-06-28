import useEth from "../../contexts/EthContext/useEth";
import { useState, useRef } from "react";

function GetVoters() {
  const { state: { accounts, contract } } = useEth();
  const [address, setAddress] = useState();
  const [isVoter, setisVoter] = useState();
  const inputRef = useRef(null);

  //Set Value on Input Event
  const handleChange = event => {
    event.preventDefault();
    setAddress(event.target.value);
    console.log("GetVoters : " + event.target.value);
  };

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault();

    // 👇️ clear all input values in the form
    event.target.reset();
  };

  // Set Value on Click Button
  const handleClick = async (event) => {
    if (address === "") {
      alert("Please enter an address");
      return;
    }

    await contract.methods
    .getVoter(address)
    .call({ from: accounts[0] })
    .then((results) => {
      /* if (results.isRegistered === true) {
        setisVoter("true");
      }
      else {setisVoter("false");} */
      setisVoter(results.isRegistered);
      console.log(results.isRegistered);
      console.log("isVoter value : " + isVoter);
    })
    .catch((err) => alert(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Check if address is a registred Voter (Only Voters can check)</p>
        <input type="text" size="50" placeholder="Example : 0xABCDE123456..." onChange={handleChange}  ref={inputRef}/> &emsp;
        <button onClick={handleClick} type="submit">Check address</button>

        {isVoter === true
          ? <p>Address is Voter : <font color="green"> {address} </font></p>
          : ''
        }
        {isVoter === false
          ? <p>Address is Voter : <font color="green"> {address} </font></p>
          : ''
        }

      </form>
    </div>
  );
}

export default GetVoters;
