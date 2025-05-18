import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from "../../ui/Select/Select";
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

  const formatNumber = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue ? Number(numericValue).toLocaleString("en-US") : "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const formattedValue =
      name === "mileageFrom" || name === "mileageTo"
        ? formatNumber(value)
        : value;

    setLocalFilters((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setFilter(localFilters));
  };

  return (
    <form className={css.filterPanel} onSubmit={handleSubmit}>
      <div className={css.filterList}>
        <Select
          label="Car brand"
          name="brand"
          value={localFilters.brand}
          onChange={handleChange}
          options={brands.map((b) => ({ label: b, value: b }))}
          placeholder="Choose a brand"
        />
      </div>

      <div className={css.filterList}>
        <Select
          label="Price/1 hour"
          name="price"
          value={localFilters.price}
          onChange={handleChange}
          options={[30, 40, 50, 60, 70, 80, 90].map((p) => ({
            label: `To $${p}`,
            value: String(p),
          }))}
          placeholder="Choose a price"
        />
      </div>

      <fieldset className={css.mileageBox}>
        <legend className={css.mileageLegend}>Car mileage / km</legend>
        <div className={css.inputGroup}>
          <div className={css.inputWrapper}>
            <span className={css.inputPrefix}>From</span>
            <input
              className={`${css.fieldInput} ${css.firstInput}`}
              type="text"
              autoComplete="off"
              name="mileageFrom"
              value={localFilters.mileageFrom}
              onChange={handleChange}
            />
          </div>

          <div className={css.mileageDivider}></div>

          <div className={css.inputWrapper}>
            <span className={css.inputPrefix}>To</span>
            <input
              className={`${css.fieldInput} ${css.lastInput}`}
              type="text"
              autoComplete="off"
              name="mileageTo"
              value={localFilters.mileageTo}
              onChange={handleChange}
            />
          </div>
        </div>
      </fieldset>

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
}
