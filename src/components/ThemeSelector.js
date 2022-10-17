//import
import { useTheme } from "../hooks/useTheme";
import "./ThemeSelector.css";
import modeIcon from "../assets/mode_icon.svg";

//color themes array
const themeColors = ["#58249c", "#249c6b", "#b70233"];

export default function ThemeSelector() {
  //useTheme variable
  const { changeColor, changeMode, mode } = useTheme();

  //toggleMode function
  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  //return "theme-selector"/"mode-toggle"/<img src, onClick, alt, style>  "theme-buttons"/map each color to its color, onClick, style
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="dark/light mode toggle icon"
          onClick={toggleMode}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
