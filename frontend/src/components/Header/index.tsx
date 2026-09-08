import { use } from "react";
import { Moon, Salad, Sun } from "lucide-react";
import { ColorModeContext } from "../../theme/ColorModeContext";
import "./index.scss";

export function Header() {
  // React 19's `use` reads context directly, replacing useContext for this case.
  const { mode, toggleColorMode } = use(ColorModeContext);

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">
          <Salad size={22} color="#4ade80" />
        </span>
        <div>
          <h1 className="header__title">PlateLens</h1>
          <p className="header__subtitle">Smart Food Analyzer</p>
        </div>
      </div>

      <div className="header__actions">
        <div className="header__toggle-group">
          <button
            type="button"
            aria-label="Enable light mode"
            className={`header__toggle ${mode === "light" ? "header__toggle--active" : ""}`}
            onClick={() => mode !== "light" && toggleColorMode()}
          >
            <Sun size={17} color="#f59e0b" fill="#fbbf24" />
          </button>
          <button
            type="button"
            aria-label="Enable dark mode"
            className={`header__toggle ${mode === "dark" ? "header__toggle--active" : ""}`}
            onClick={() => mode !== "dark" && toggleColorMode()}
          >
            <Moon size={17} color="#f97316" fill="#fb923c" />
          </button>
        </div>

        <span className="header__avatar">A</span>
      </div>
    </header>
  );
}
