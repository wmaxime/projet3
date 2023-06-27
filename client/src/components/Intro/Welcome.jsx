import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Welcome() {
  const { state } = useEth(); 


  return (
    <div className="welcome">
      <h1>👋 Welcome to the Voting Dapp</h1>
      <p>
        You are connected with this address : {state.accounts}
      </p>
    </div>
  );
}

export default Welcome;
