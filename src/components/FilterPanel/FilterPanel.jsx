import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectFilters } from "../../redux/filters/selectors";
import { selectBrands } from "../../redux/brands/selectors";
import { setFilter, resetFilters } from "../../redux/filters/slice";
import { fetchBrands } from "../../redux/cars/operations";
import css from "../FilterPanel/FilterPanel.module.css";

export default function FilterPanel() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);

  const [localFilters, setLocalFilters] = useState({
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  });

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // зупиняє перезавантаження сторінки
    dispatch(setFilter(localFilters));
  };

  return (
    <form className={css.filterPanel} onSubmit={handleSubmit}>
      <label>
        Car brand
        <select name="brand" value={localFilters.brand} onChange={handleChange}>
          <option value="">Choose a brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label>
        Price/ 1 hour
        <select name="price" value={localFilters.price} onChange={handleChange}>
          <option value="">Choose a price</option>
          {[30, 40, 50, 60, 70, 80].map((price) => (
            <option key={price} value={price}>
              To {price}
            </option>
          ))}
        </select>
      </label>

      <fieldset className={css.mileageBox}>
        <legend>Car mileage / km</legend>
        <input
          type="number"
          name="mileageFrom"
          placeholder="From "
          value={localFilters.mileageFrom}
          onChange={handleChange}
        />

        <input
          type="number"
          name="mileageTo"
          placeholder="To"
          value={localFilters.mileageTo}
          onChange={handleChange}
        />
      </fieldset>

      <button type="submit">Search</button>
    </form>
  );
}
