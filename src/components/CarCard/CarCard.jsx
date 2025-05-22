import { useDispatch, useSelector } from "react-redux";
import css from "../CarCard/CarCard.module.css";
import { Link } from "react-router-dom";
import heartIcon from "../../assets/heart.svg";
import heartFilledIcon from "../../assets/heart-active.svg";
import { toggleFavorite } from "../../redux/favorite/slice";
import { selectFavoriteIds } from "../../redux/favorite/selectors";
import { exctractCityandCountry } from "../../utils/extractCityandCountry";
import { formatMileage } from "../../utils/formatMileage.js";

import { ROUTES } from "../../constants";
export default function CarCard({
  id,
  year,
  brand,
  model,
  img,
  type,
  rentalPrice,
  rentalCompany,
  address,
  mileage,
}) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.imgWrap}>
        <img className={css.imgCard} src={img} alt={`${brand} ${model}`} />
        <button onClick={handleToggleFavorite} className={css.heartBtn}>
          <img
            src={isFavorite ? heartFilledIcon : heartIcon}
            alt={isFavorite ? "In favorites" : "Add to favorites"}
            className={css.heartIcon}
          />
        </button>
      </div>
      <div className={css.cardContent}>
        <div className={css.titleRow}>
          <h2 className={css.title}>
            {brand}&nbsp; <span className={css.model}>{model}</span>, {year}
          </h2>
          <span className={css.price}>${rentalPrice}</span>
        </div>

        <ul className={css.detailsList}>
          <li>{exctractCityandCountry(address)}</li>
          <li>{rentalCompany}</li>
          <li>{type}</li>
          <li>{formatMileage(mileage)}</li>
        </ul>
        <Link to={`${ROUTES.CATALOG}/${id}`} className={css.link}>
          Read more
        </Link>
      </div>
    </div>
  );
}
