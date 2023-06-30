import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
//import Voting from "./components/Voting";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Intro />
          <hr />

        </div>
      </div>
    </EthProvider>
  );
}

export default App;
