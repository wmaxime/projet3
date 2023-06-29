import useEth from "../../contexts/EthContext/useEth";
//import { useState, useEffect } from "react";

function Welcome() {
  const { state: { accounts, isOwner, contract } } = useEth();

  return (
    <div>
      <h1>👋 Welcome to the Voting Dapp</h1>
      {contract 
      ? <p> You are connected with this address : {accounts} </p>
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
