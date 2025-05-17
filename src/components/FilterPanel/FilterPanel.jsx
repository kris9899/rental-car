import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import { selectBrands } from "../../redux/brands/selectors";
import { setFilter } from "../../redux/filters/slice";
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
    event.preventDefault();
    dispatch(setFilter(localFilters));
  };

  return (
    <form className={css.filterPanel} onSubmit={handleSubmit}>
      <div className={css.filterList}>
        <CustomSelect
          label="Car brand"
          name="brand"
          value={localFilters.brand}
          onChange={handleChange}
          options={brands}
        />
      </div>

      <div className={css.filterList}>
        <CustomSelect
          label="Price/1 hour"
          name="price"
          value={localFilters.price}
          onChange={handleChange}
          options={[30, 40, 50, 60, 70, 80, 90].map((p) => ({
            label: `To ${p}`,
            value: String(p),
          }))}
        />
      </div>

      <fieldset className={css.mileageBox}>
        <legend className={css.mileageLegend}>Car mileage / km</legend>
        <div className={css.inputGroup}>
          <input
            className={css.fieldInput}
            type="number"
            name="mileageFrom"
            placeholder="From "
            value={localFilters.mileageFrom}
            onChange={handleChange}
          />
          <div className={css.divider}></div>
          <input
            className={css.fieldInput}
            type="number"
            name="mileageTo"
            placeholder="To"
            value={localFilters.mileageTo}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
}
