import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Demo from "./components/Demo";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Intro />
          <hr />
          <Demo />
          <hr />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
