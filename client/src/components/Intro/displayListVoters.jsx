import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function DisplayListVoters() {
  const { state: { contract } } = useEth();
  const [ListVoters, setListVoters] = useState([]);

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

//  console.log(ListVoters);
//  console.log(ListVoters.length);

  return (
    <div>
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

export default DisplayListVoters;
