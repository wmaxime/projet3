import useEth from "../../../contexts/EthContext/useEth";
import { useState, useRef } from "react";

function GetVoters() {
  const { state: { accounts, contract } } = useEth();
  const [address, setAddress] = useState();
  const [isVoter, setisVoter] = useState();
  const inputRef = useRef(null);
  //const [ListVoters, setListVoters] = useState([]);

  //Set Value on Input Event
  const handleChange = event => {
    event.preventDefault();
    const inputValue = event.target.value;
    setAddress(inputValue);
  };

  const handleSubmit = event => {
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
    if (address.length > 42 || address.length < 42) {
      alert("L''adresse doit faire 42 caractères !");
      window.location.reload(false);
      return;
    }
    await contract.methods
    .getVoter(address)
    .call({ from: accounts[0] })
    .then((results) => {
      setisVoter(results.isRegistered);
      //console.log("isVoter value : " + isVoter);
    })
    .catch((err) => alert(err));
  };


  return (
    <div><hr className="hr_page"/>
      <form onSubmit={handleSubmit}>
        <p><b>Vérification d'une adresse (Seulement les participants peuvent vérifier) :</b></p>
        <input type="text" size="50" placeholder="Example : 0xABCDE123456..." onChange={handleChange} ref={inputRef} className="input-addr"/> &emsp;
        <button onClick={handleClick} type="submit">Vérification</button>&nbsp;

        {isVoter === true
          ? <p>L'adresse est déjà enregistré : <font color="green"> {address} </font></p>
          : ''
        }
        {isVoter === false
          ? <p>L'adresse n'est pas enregistré  : <font color="red"> {address} </font></p>
          : ''
        }
      </form>
      <br></br>
    </div>
  );
}

export default GetVoters;
