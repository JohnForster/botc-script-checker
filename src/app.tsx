import { useState } from "preact/hooks";
import {
  FAILURES,
  validateScript,
  type ValidationResult,
} from "./validator/validator";
import type { Script, OldScript } from "./types/types";
import compiledCharacters from "./data/compiled_characters.json";
import "./app.css";

export function App() {
  const [scriptText, setScriptText] = useState("");
  const [script, setScript] = useState<Script | null>(null);
  const [validationResults, setValidationResults] = useState<
    ValidationResult[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: Event) => {
    console.log("File upload event:", event);
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setScriptText(content);
      };
      reader.readAsText(file);
      setValidationResults(null);
      setError(null);
    }
  };

  const convertOldToNewFormat = (oldScript: OldScript): Script => {
    const [meta, ...characters] = oldScript;
    return [meta, ...characters.map((char) => char.id)];
  };

  const isOldFormat = (script: any): script is OldScript => {
    const [_, ...characters] = script;
    return (
      characters.length > 0 &&
      typeof characters[0] === "object" &&
      "id" in characters[0]
    );
  };

  const handleValidate = () => {
    setError(null);
    setValidationResults([]);

    if (!scriptText.trim()) {
      setError("Please provide a script to validate");
      return;
    }

    try {
      const parsedScript = JSON.parse(scriptText);
      let script: Script;

      if (isOldFormat(parsedScript)) {
        script = convertOldToNewFormat(parsedScript);
      } else {
        script = parsedScript as Script;
      }

      const results = validateScript(script);
      setScript(script);
      setValidationResults(results);
      
      // Scroll to bottom of page after validation
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    } catch (e) {
      setError("Invalid JSON format");
      // Also scroll on error to show the error message
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "high":
        return "severity-high";
      case "medium":
        return "severity-medium";
      case "low":
        return "severity-low";
      default:
        return "";
    }
  };

  const getCharacterName = (characterId: string): string => {
    const character =
      compiledCharacters[characterId as keyof typeof compiledCharacters];
    return character?.name || characterId;
  };

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

      <div class="input-section">
        <h2>Upload or Paste Custom Script</h2>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          class="file-input"
        />
        <textarea
          value={scriptText}
          onInput={(e) =>
            setScriptText((e.target as HTMLTextAreaElement).value)
          }
          placeholder="Paste your JSON script here..."
          class="script-textarea"
          rows={10}
        />
        <button onClick={handleValidate} class="validate-button">
          Check Script
        </button>
      </div>

      {error && (
        <div class="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {validationResults && validationResults.length > 0 && (
        <div class="results-section">
          <h2>{script && script[0].name} - Results</h2>
          <div class="results-summary">
            Found {validationResults.length} issue
            {validationResults.length !== 1 ? "s" : ""}
          </div>
          {validationResults.map((result, index) => (
            <div
              key={index}
              class={`result-item ${getSeverityClass(result.severity)}`}
            >
              <div class="result-header">
                <span class="severity-badge">
                  {result.severity.toUpperCase()}
                </span>
                <div class="result-id">{FAILURES[result.id]}: </div>
                <div class="result-characters">
                  {result.characters.map(getCharacterName).join(", ")}
                </div>
              </div>
              <div class="result-message">{result.message}</div>
            </div>
          ))}
        </div>
      )}

      {validationResults &&
        validationResults.length === 0 &&
        scriptText &&
        !error && <div class="success">No issues found!</div>}
    </div>
  );
}
