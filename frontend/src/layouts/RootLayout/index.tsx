import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { BackgroundBlobs } from "../../components/BackgroundBlobs";
import "./index.scss";

export function RootLayout() {
  return (
    <div className="root-layout">
      <BackgroundBlobs />
      {/* Header spans the full viewport width while page content stays centered. */}
      <div className="root-layout__header-bar">
        <Header />
      </div>
      <main className="root-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
