import Welcome from "./Welcome";
import Admin from "./admin";
import useEth from "../../contexts/EthContext/useEth";

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
    </>
  );
}

export default Intro;
