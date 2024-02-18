import ReactDOM from "react-dom/client";
import App from "./App.jsx";

console.log("Entry client file")
ReactDOM.hydrateRoot(
  document.getElementById("root"),
    <App />
);

