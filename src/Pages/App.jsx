import logo from "../Images/logo.svg";
import "../Css/App.css";

import { Link } from "react-router-dom";
function App() {
  return (
    <>
      <p>
        Pariatur sunt ipsum quis dolor est elit Lorem consectetur eiusmod id.
        Deserunt ad minim dolore duis deserunt ad sunt qui qui. Eu quis aliquip
        laboris cupidatat consequat mollit nulla. Reprehenderit culpa dolor amet
        eu elit fugiat eu in laboris laborum veniam eu elit. Et est laboris
        velit incididunt elit tempor pariatur consectetur labore aliquip. Aliqua
        ullamco eu laboris aliquip tempor deserunt non minim est Lorem. Id non
        cillum velit ut velit voluptate irure non Lorem aliquip nostrud.
      </p>
      <Link to="/mint">mint</Link>
      <Link to="/withdraw">refferal</Link>
    </>
  );
}

export default App;
