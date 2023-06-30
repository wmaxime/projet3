import useEth from "../../contexts/EthContext/useEth";

function GetWinningProposal() {
    const { state: { user } } = useEth();



    return (
    <div>
        <p>GET WINNING PROPOSAL</p>
        {user}
    </div>
    );
} 

export default GetWinningProposal;