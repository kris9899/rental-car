import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import { ROUTES } from "../../constants";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <NavLink to={ROUTES.HOME} className={buildLinkClass}>
          <span className={css.span}>Home</span>
        </NavLink>
        <NavLink to={ROUTES.CATALOG} className={buildLinkClass}>
          <span className={css.span}>Catalog</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
