import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import routes from "./routes";
import { selectToken } from "./features/auth";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const token = useSelector(selectToken);
  axios.defaults.headers.common["authorization"] = token;

  return routes;
}

export default App;
