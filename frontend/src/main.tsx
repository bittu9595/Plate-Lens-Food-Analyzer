import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/global.scss";
import { ColorModeProvider } from "./theme/ColorModeContext";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <RouterProvider router={router} />
    </ColorModeProvider>
  </StrictMode>,
);
