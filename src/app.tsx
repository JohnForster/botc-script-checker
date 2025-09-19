// import { Validator } from "./components/Validator";
import "./app.css";
import ScriptChecker from "./components/ScriptChecker";

export const App = () => {
  return (
    <div class="container">
      <h1>Clocktower Custom Script Checker</h1>

      <p>
        A tool to help custom script writers spot potential issues early. This
        is still <strong>very early in development</strong>, and it is
        impossible to catch every issue with a script. There may be false
        positives, and it won't catch every mistake.
      </p>

      <p>
        <strong>
          If you have any feedback, please let me know{" "}
          <a href="https://forms.gle/D4sPXcXHy4v2o5CP8">
            <strong>here</strong>
          </a>
          .
        </strong>
      </p>
      <ScriptChecker />
    </div>
  );
};
