import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import DisplayWorkflow from "./displayWorkflow";

function Welcome() {
  const { state: { accounts, isOwner, contract } } = useEth();
  const [userAddress, setUserAddress] = useState("");
  //const [shorrtAdd, setshorrtAdd] = useState();

  useEffect(() => {
    const updateUserAddress = () => {
        if(accounts !== null) {
            setUserAddress(accounts[0]);
        }        
    }
    updateUserAddress();
  }, [accounts]);

  //let startAddr = userAddress.substring(0, 5);
  //let endAddr = userAddress.substring(37);
  let shortAdd = (userAddress.substring(0, 5) + "..." + userAddress.substring(37));
  //console.log(startAddr);
  //console.log(endAddr);
  console.log(shortAdd);

/*  useEffect(() => {
    const setshorrtAdd = () => {
       //setshorrtAdd(userAddress);
       let startAddr = userAddress.substring(0, 5);
       //let endAddr = userAddress.substring(37);
       //let addr = startAddr + "...." + endAddr;
       console.log(startAddr);    
    }
    setshorrtAdd();
  }, [accounts]); */

  return (
    <div>
      <h1>👋 Welcome to the Voting Dapp</h1>
      {!isOwner
        ? <DisplayWorkflow />
        :''
      }
      {contract 
      ? <p> You are connected with this address : {shortAdd} </p>
      : <p> Veuillez vous connecter sur le bon reseau.</p>
      }

      {isOwner
        ? 'You are : Owner'
        : ''
      }

    </div>
  );
}

export default Welcome;
