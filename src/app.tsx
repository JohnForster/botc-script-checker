// import { Validator } from "./components/Validator";
import "./app.css";
import ScriptChecker from "./components/ScriptChecker";
// import oracleIcon from "../public/favicon.png";

export const App = () => {
  return (
    <div class="container">
      <div class="main-heading">
        <div>
          <img src="/favicon.svg"></img>
        </div>
        <h1>Blood on the Clocktower Custom Script Checker</h1>
      </div>

      <p>
        An unofficial tool to help custom script writers spot potential issues
        early. This is still <strong>very early in development</strong>, and it
        is impossible to catch every issue with a script. There may be false
        positives, and it won't catch every mistake.
      </p>

      <p>
        <strong>
          ⭐️ If you have any feedback, please let me know{" "}
          <a href="https://forms.gle/z1yeAW7x91X4Uc4H8">
            <strong>here</strong>
          </a>{" "}
          ⭐️
        </strong>
      </p>
      <ScriptChecker />
      <footer>
        This project is not affiliated with The Pandemonium Institute. All
        roles, rules, images and content are the property of Steven Medway and
        The Pandemonium Institute.
      </footer>
    </div>
  );
};
