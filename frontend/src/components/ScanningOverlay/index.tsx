import "./index.scss";

// Animated sweep line shown on top of the image while Gemini is analyzing it.
export function ScanningOverlay() {
  return (
    <div className="scanning-overlay">
      <span className="scanning-overlay__line" />
      <span className="scanning-overlay__label">Scanning ingredients...</span>
    </div>
  );
}
