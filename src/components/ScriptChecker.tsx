import { useEffect, useState } from "preact/hooks";

import "./script-checker.css";
import { defaultText } from "./defaultText";
import {
  getCharacters,
  getName,
  type BloodOnTheClocktowerCustomScript,
  type Script,
  type ScriptElement,
  type ScriptMetadata,
  type ValidationResult,
} from "botc-script-checker";

const logUsage = async (script: BloodOnTheClocktowerCustomScript) => {
  const FIREBASE_URL = "https://logusage-dvbaqkhwga-uc.a.run.app";
  const isMetaData = (el: ScriptElement): el is ScriptMetadata =>
    typeof el === "object" && el.id === "_meta";
  const meta = script.find(isMetaData);
  const characters = getCharacters(script);

  fetch(FIREBASE_URL, {
    method: "POST",
    body: JSON.stringify({
      app: "script-checker",
      title: getName(script),
      author: meta?.author ?? "Unknown",
      characterCount: characters.length,
      characters,
    }),
    headers: {
      "x-password": "dungeon-mister",
      "Content-Type": "application/json",
    },
  }).catch(console.error);
};

function ScriptChecker() {
  const [scriptText, setScriptText] = useState(defaultText);
  const [script, setScript] = useState<Script | null>(null);
  const [validationResults, setValidationResults] = useState<
    ValidationResult[] | null
  >(null);
  const [Validator, setValidator] = useState<
    typeof import("botc-script-checker") | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    import("botc-script-checker").then((obj) => setValidator(obj));
  }, []);

  const handleFileUpload = (event: Event) => {
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

  const handleValidate = async () => {
    setError(null);
    setValidationResults([]);

    if (!scriptText.trim()) {
      setError("Please provide a script to validate");
      return;
    }

    if (!Validator) {
      setError("Error loading validator");
      return;
    }

    try {
      const script: Script = JSON.parse(scriptText);

      const results = Validator.validateScript(script);
      logUsage(script);
      setScript(script);
      setValidationResults(results);
      // Scroll to bottom of page after validation
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    } catch (e) {
      setError("Invalid JSON format");
      // Also scroll on error to show the error message
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
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
    if (!Validator) return "";
    const character = Validator.ALL_CHARACTERS[characterId];
    return character?.name || characterId;
  };

  return (
    <>
      <div class="input-section">
        <h2>Upload or Paste Custom Script</h2>
        <input
          type="file"
          aria-label="JSON Script File Upload"
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
        <button
          onClick={handleValidate}
          disabled={!Validator}
          class="validate-button"
        >
          {Validator ? "Check Script" : "Loading..."}
        </button>
      </div>

      {error && (
        <div class="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {Validator && validationResults && validationResults.length > 0 && (
        <div class="results-section">
          <h2>{script && getName(script)} - Results</h2>
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
                <div class="result-id">
                  {Validator.FAILURE_NAMES[result.id]}:{" "}
                </div>
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
    </>
  );
}

export default ScriptChecker;
