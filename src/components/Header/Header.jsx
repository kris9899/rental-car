import { Link } from "react-router-dom";
import logoSvg from "../../assets/favicon.svg";

import { ROUTES } from "./../../constants/index";

import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link to={ROUTES.HOME} className="btn-pr-effect">
        <img src={logoSvg} alt="Logo" />
      </Link>
    </header>
  );
}
