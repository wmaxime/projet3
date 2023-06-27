import useEth from "../../contexts/EthContext/useEth";

function Welcome() {
  {/* const { state } = useEth();  {/* }=> to return account address, use in code with : {state.accounts} */}
  const { state: { accounts, isOwner } } = useEth();

  return (
    <div className="welcome">
      <h1>👋 Welcome to the Voting Dapp</h1>
      <p>
        You are connected with this address : {accounts}
      </p>
      {isOwner
        ? 'You are Owner'
        :  'Not Owner'
      }
    </div>
  );
}

export default Welcome;
