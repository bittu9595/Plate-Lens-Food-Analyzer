import "./index.scss";

// Soft blurred gradient blobs rendered behind all page content.
export function BackgroundBlobs() {
  return (
    <div className="background-blobs" aria-hidden>
      <span className="background-blobs__blob background-blobs__blob--one" />
      <span className="background-blobs__blob background-blobs__blob--two" />
      <span className="background-blobs__blob background-blobs__blob--three" />
    </div>
  );
}
