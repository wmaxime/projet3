import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import GetWorkflowNumber from "./getWorkflowNumber";

function Menu() {
    const { state: { accounts, isOwner, contract } } = useEth();
    const [userAddress, setUserAddress] = useState("");
    const [isVoter, setIsVoter] = useState(false);

    const description = [
        "",
        "Inscription des voteurs en cours...",
        "Enregistrement des propositions",
        "Fin de l'enregistrement des propositions",
        "Ouverture des votes",
        "Fermeture des votes",
        "Fin des haricots"
    ]

    const workflowDescription = description[GetWorkflowNumber() + 1];

    useEffect(() => {
        // calcul short address to display
        const updateUserAddress = () => {
            if(accounts !== null) {
                setUserAddress(accounts[0]);
            }        
        }
        updateUserAddress();

        // refresh de page si changement de compte ou Network dans Metamask 
        if(window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            })
            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            })
        }

        async function checkVoterStatus() {
            const events = await contract.getPastEvents("VoterRegistered", { fromBlock: 0, toBlock: "latest" });
            //console.log("events : " + events);
            //console.log("Nb events : " + events.length);
            let voter = events.find((voter) => voter.returnValues.voterAddress === accounts[0]);
            //console.log("checkVoterStatus voter value : " + voter);
            if (voter) {
                let status = await contract.methods.getVoter(voter.returnValues.voterAddress).call({ from: accounts[0] });
                //console.log("event voter status value : " + status); // isRegistered = 0, hasVoted = 1, votedProposalId = 2
      
                if (status[0] === true) {
                  setIsVoter(true);
                }
                //if (status[1] === true) {
                //  setHasVoted(true);
                //}
            }
        }

        checkVoterStatus();

    }, [accounts, contract]);

    // Definition de la short Address
    const shortAdd = (userAddress.substring(0, 5) + "....." + userAddress.substring(37));

        // Definition du titre
        if (isOwner) {
            //setUserTitle("Admin");
            let menuTitle = "Admin";
        }
        if (isVoter) {
            //setUserTitle("Voter");
            let menuTitle = "Voter";
        }


        function setUserTitle() {
            let title = "";
            if (!isVoter && !isOwner) {
                title ="Visitor";
            }
            if (isOwner) {
                title ="Admin";
            }
            if (isVoter) {
                title ="Voteur";
            }
            return title;
        }

        const menuTitle = setUserTitle();
        console.log("userTitle value : " + setUserTitle());

  return (
    <>

        <table className="menu">
        <colgroup>
        <col className="menu_left" />
        <col className="menu_titre" />
        <col className="menu_addr" />
        </colgroup>
        <thead>
        <tr>
            <td className="menu_left">&nbsp;&nbsp;{workflowDescription}</td>
            <td className="menu_titre">{menuTitle}</td>
            <td className="menu_addr">{shortAdd}</td>
        </tr>
        </thead>
        </table>

    </>
  );
}

export default Menu;
