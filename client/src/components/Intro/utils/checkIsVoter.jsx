import useEth from "../../../contexts/EthContext/useEth";
import { useState } from "react";

function DisplayIsVoter() {
  const { state: { accounts, contract, user } } = useEth();
  const [isVoter, setisVoter] = useState();

  // Check if isVoter
  async function checkIsVoter(addr)  {
    await contract.methods
    .getVoter(addr)
    .call({ from: accounts[0] })
    .then((results) => {
      results.isRegistered
      ? setisVoter("true")
      : setisVoter("false");
    })
    .catch((err) => alert(err));
  };

  let toto = checkIsVoter(user);
  console.log(toto);
  let result = accounts + " : " + isVoter;

  return (
    <div>
        {result}
    </div>
  );
}

export default DisplayIsVoter;
