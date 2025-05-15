import { useSelector } from "react-redux";

import CarCard from "../CarCard/CarCard";
import css from "../CarsList/CarsList.module.css";
import { selectCars, selectCarsLoading } from "../../redux/cars/selectors";

export default function CarsList() {
  const visibleCars = useSelector(selectCars);
  const isLoading = useSelector(selectCarsLoading);

  return (
    <div>
      {isLoading ? (
        <p className={css.carsListInfo}>Loading cars...</p>
      ) : (
        <ul className={css.carsList}>
          {visibleCars.length > 0 ? (
            visibleCars.map(
              ({
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
              }) => (
                <li key={id} data-car-card className={css.carsItems}>
                  <CarCard
                    id={id}
                    year={year}
                    brand={brand}
                    model={model}
                    img={img}
                    type={type}
                    rentalPrice={rentalPrice}
                    rentalCompany={rentalCompany}
                    address={address}
                    mileage={mileage}
                  />
                </li>
              )
            )
          ) : (
            <p className={css.carsListInfo}>No cars found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
