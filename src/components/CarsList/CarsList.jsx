import { useSelector } from "react-redux";

import CarCard from "../CarCard/CarCard";
import css from "../CarsList/CarsList.module.css";
import { selectCars, selectCarsLoading } from "../../redux/cars/selectors";
import Loader from "../../ui/Loader/Loader";

export default function CarsList() {
  const visibleCars = useSelector(selectCars);
  const isLoading = useSelector(selectCarsLoading);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : visibleCars.length > 0 ? (
        <ul className={css.carsList}>
          {visibleCars.map(
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
          )}
        </ul>
      ) : (
        <p className={css.carsListInfo}>No cars found.</p>
      )}
    </div>
  );
}
