import Welcome from "./Welcome";
import Admin from "./admin";
import useEth from "../../contexts/EthContext/useEth";
import GetWinningProposal from "./getWiningProposal";

function Intro() {
  const { state: { isOwner} } = useEth();

  return (
    <>
      <Welcome />
      <hr />
      {isOwner
        ? <Admin />
        : ''
      }
      <hr />
<GetWinningProposal />
    </>
  );
}

export default Intro;