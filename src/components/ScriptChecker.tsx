import { useEffect, useRef, useState } from "preact/hooks";
import { TrashIcon } from "@heroicons/react/24/outline";

import "./script-checker.css";
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
  const [scriptText, setScriptText] = useState("");
  const [script, setScript] = useState<Script | null>(null);
  const [validationResults, setValidationResults] = useState<
    ValidationResult[] | null
  >(null);
  const [Validator, setValidator] = useState<
    typeof import("botc-script-checker") | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [showTextarea, setShowTextarea] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    import("botc-script-checker").then((obj) => setValidator(obj));
  }, []);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // Only intercept paste if it's not targeted at the textarea
      const isTextareaPaste = e.target === textareaRef.current;

      if (!isTextareaPaste && e.clipboardData) {
        const pastedText = e.clipboardData.getData("text");
        if (pastedText) {
          setScriptText(pastedText);
          setShowTextarea(true);
          setValidationResults(null);
          setError(null);
          e.preventDefault();
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setScriptText(content);
        setShowTextarea(true);
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

  const handleClear = () => {
    setScriptText("");
    setValidationResults(null);
    setError(null);
    setScript(null);
    setShowTextarea(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPod|iPad/.test(navigator.platform);

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
          ref={fileInputRef}
        />
        {!showTextarea && (
          <div class="paste-prompt">
            <p class="paste-instruction">
              Or paste JSON directly with <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>+
              <kbd>V</kbd>
            </p>
          </div>
        )}
        {showTextarea && (
          <>
            <textarea
              ref={textareaRef}
              value={scriptText}
              onInput={(e) =>
                setScriptText((e.target as HTMLTextAreaElement).value)
              }
              placeholder="Paste your JSON script here..."
              class="script-textarea"
              rows={10}
            />
            <div class="button-container">
              <button
                onClick={handleValidate}
                disabled={!Validator}
                class="validate-button"
              >
                {Validator ? "Check Script" : "Loading..."}
              </button>
              <button
                onClick={handleClear}
                class="clear-button"
                aria-label="Clear input"
                title="Clear input"
              >
                <TrashIcon class="icon" />
              </button>
            </div>
          </>
        )}
      </div>

      {error && (
        <div class="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {Validator && validationResults && validationResults.length > 0 && (
        <div class="results-section">
          <h2>{script ? getName(script) : "Untitled Script"} - Results</h2>
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
        !error && (
          <div class="success">
            No issues found! Next, why don't you try the{" "}
            <a href="https://fancy.ravenswoodstudio.xyz">Fancy PDF Generator</a>{" "}
            and make your script beautiful?
          </div>
        )}
    </>
  );
}

export default ScriptChecker;
