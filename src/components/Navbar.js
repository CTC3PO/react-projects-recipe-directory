import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styles
import "./Navbar.css";
import Searchbar from "./Searchbar";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  //we pass the ThemeContext, the Provider just wrap the whole App.js
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
