import css from "./HomeTab.module.css";
import { ROUTES } from "../../constants";
import { Link } from "react-router-dom";

export default function HomeTab() {
  return (
    <div className={css.wrap}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <p className={css.text}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link to={ROUTES.CATALOG} className={css.button}>
        View Catalog
      </Link>
    </div>
  );
}
