import useEth from "../../../contexts/EthContext/useEth";
import { useState, useEffect, useRef } from "react";

function GetProposal() {
  const { state: { accounts, contract } } = useEth();
  const [address, setAddress] = useState();
  const [isVoter, setisVoter] = useState();
  const inputRef = useRef(null);
  const [listProposals, setListProposals] = useState([]);
  const [openList, setOpenList] = useState("false");

  //Set Value on Input Event
  const handleChange = event => {
    event.preventDefault();
    setAddress(event.target.value);
    setisVoter();
    console.log("GetVoters : " + event.target.value);
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

    await contract.methods
    .getVoter(address)
    .call({ from: accounts[0] })
    .then((results) => {
      setisVoter(results.isRegistered);
      console.log("isVoter value : " + isVoter);
    })
    .catch((err) => alert(err));
  };

  // Set Value on Click Button
  const displayListe = (event) => {
    setOpenList("true");
  };
  console.log("openList value : " + openList);

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
      console.log(listVotersEvent);
      // creation du tableau avec MAP (Merci console.log)
      let addrVoters = listVotersEvent.map((voter) => voter.returnValues.voterAddress);

      // Register Events
      setListVoters(addrVoters);
    }

    getListVoters();

  }, [contract])


  console.log(ListVoters);
  console.log(ListVoters.length);

  return (
    <div><br></br>
      <form onSubmit={handleSubmit}>
        <p>Check if address is a registred Voter (Only Voters can check) :</p>
        <input type="text" size="50" placeholder="Example : 0xABCDE123456..." onChange={handleChange} ref={inputRef}/> &emsp;
        <button onClick={handleClick} type="submit">Check address</button><button onClick={displayListe} type="submit">Display Voters</button>

        {isVoter === true
          ? <p>Address is Voter : <font color="green"> {address} </font></p>
          : ''
        }
        {isVoter === false
          ? <p>Address is not Voter : <font color="red"> {address} </font></p>
          : ''
        }
      </form>
      <br></br>
      {
       <center><table className="listeVoters">
            <thead>
              <tr>
                <th class="th-titre">Nombre de voteurs inscrits : {ListVoters.length}</th>
              </tr>
            </thead>
            <tbody>
              {ListVoters.map((item) => (
                <tr key={item}>
                  <td class="td-addr">{item}</td>
                </tr>
              ))}
            </tbody>
          </table></center>
        }
    </div>
  );
}

export default GetProposal;
