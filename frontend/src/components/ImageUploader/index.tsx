import { useRef, useState, type DragEvent, type MouseEvent } from "react";
import { Camera, Check } from "lucide-react";
import { ScanningOverlay } from "../ScanningOverlay";
import "./index.scss";

interface ImageUploaderProps {
  action: (formData: FormData) => void;
  isPending: boolean;
  resultCount: number | null;
  elapsedSeconds: number | null;
  error: string | null;
  onReset: () => void;
}

export function ImageUploader({
  action,
  isPending,
  resultCount,
  elapsedSeconds,
  error,
  onReset,
}: ImageUploaderProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function setFile(file: File | null) {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  }

  function submitFile(file: File) {
    setFile(file);
    // Wait a tick so React commits the preview before the form action fires.
    requestAnimationFrame(() => formRef.current?.requestSubmit());
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (!file || !inputRef.current) return;

    // Sync the dropped file into the hidden <input> so the form action still picks it up.
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputRef.current.files = dataTransfer.files;
    submitFile(file);
  }

  function handleReset(event: MouseEvent) {
    event.preventDefault();
    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
    onReset();
  }

  const hasResult = resultCount !== null && !error;

  return (
    <form ref={formRef} action={action} className="image-uploader card">
      <div className="image-uploader__meta">
        <span className="image-uploader__step">Step 01</span>
        <span className="image-uploader__hint">JPG · PNG · up to 10MB</span>
      </div>

      <label
        className={[
          "image-uploader__dropzone",
          isDragging ? "image-uploader__dropzone--dragging" : "",
          previewUrl ? "image-uploader__dropzone--filled" : "",
        ].join(" ")}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          className="image-uploader__input"
          type="file"
          name="image"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) submitFile(file);
          }}
        />

        {previewUrl ? (
          <div className="image-uploader__preview">
            <img
              className={`image-uploader__image ${isPending ? "image-uploader__image--scanning" : ""}`}
              src={previewUrl}
              alt="Selected preview"
            />
            {isPending && <ScanningOverlay />}
          </div>
        ) : (
          <div className="image-uploader__placeholder">
            <span className="image-uploader__camera">
              <Camera size={20} />
            </span>
            <p className="image-uploader__placeholder-title">
              Drop your dish here
            </p>
            <p className="image-uploader__placeholder-hint">
              or tap to choose a photo
            </p>
          </div>
        )}
      </label>

      {!isPending && previewUrl && hasResult && (
        <div className="image-uploader__result">
          <span className="image-uploader__result-icon">
            <Check size={16} />
          </span>
          <div>
            <p className="image-uploader__result-title">
              Ingredients extracted
            </p>
            <p className="image-uploader__result-subtitle">
              {resultCount} ingredient{resultCount === 1 ? "" : "s"} extracted
              in {elapsedSeconds?.toFixed(1)}s
            </p>
          </div>
        </div>
      )}

      {!isPending && previewUrl && error && (
        <p className="image-uploader__error">{error}</p>
      )}

      {previewUrl && !isPending && (
        <button
          type="button"
          className="image-uploader__reset"
          onClick={handleReset}
        >
          Use a different photo
        </button>
      )}
    </form>
  );
}
