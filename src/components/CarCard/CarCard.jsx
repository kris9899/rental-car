import { useDispatch, useSelector } from "react-redux";
import css from "../CarCard/CarCard.module.css";
import { Link } from "react-router-dom";
import heartIcon from "../../assets/heart.svg";
import { toggleFavorite } from "../../redux/favorite/slice";
import { selectFavoriteIds } from "../../redux/favorite/selectors";
import { exctractCityandCountry } from "../../utils/extractCityandCountry";

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

  const formatMileage = (km) =>
    `${new Intl.NumberFormat("en-US").format(km)} km`;

  return (
    <div className={css.wrapper}>
      <div className={css.imgWrap}>
        <img className={css.imgCard} src={img} alt={`${brand} ${model}`} />
        <button onClick={handleToggleFavorite} className={css.heartBtn}>
          <img
            src={heartIcon}
            alt="favorite"
            className={isFavorite ? css.active : ""}
          />
        </button>
      </div>
      <div className={css.cardContent}>
        <div className={css.titleRow}>
          <h2 className={css.title}>{`${brand} ${model}, ${year}`}</h2>
          <span className={css.price}>{rentalPrice}</span>
        </div>

        <ul className={css.detailsList}>
          <li>{exctractCityandCountry(address)}</li>
          <li>{rentalCompany}</li>
          <li>{type}</li>
          <li>{formatMileage(mileage)}</li>
        </ul>
        <Link to={`/catalog/${id}`} className={css.link}>
          Read more
        </Link>
      </div>
    </div>
  );
}
