import { useSelector } from "react-redux";
import css from "../CarDetails/CarDetails.module.css";
import { selectSelectedCar } from "../../redux/cars/selectors";
import { exctractCityandCountry } from "../../utils/extractCityandCountry";

import BookingForm from "../BookingForm/BookingForm";
import { formatMileage } from "../../utils/formatMileage";

import LocationIcon from "../../assets/location.svg";
import CheckedIcon from "../../assets/check-circle.svg";
import CalendarIcon from "../../assets/calendar/calendar.svg";
import CarIcon from "../../assets/car/car.svg";
import FuelPumpIcon from "../../assets/fuel-pump/fuel-pump.svg";
import GearIcon from "../../assets/gear/gear.svg";

export default function CarDetails() {
  const selectedCar = useSelector(selectSelectedCar);
  if (!selectedCar) return null;

  const {
    id,
    year,
    brand,
    model,
    type,
    img,
    description,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalPrice,
    address,
    rentalConditions,
    mileage,
  } = selectedCar;

  const allFeatures = [...accessories, ...functionalities];

  return (
    <div className={css.carDetailsLayout}>
      <div className={css.leftColumn}>
        <img className={css.carImg} src={img} alt={`${brand} ${model}`} />

        <BookingForm carName={`${brand} ${model}`} />
      </div>

      <div className={css.rightColumn}>
        <h2 className={css.title}>{`${brand} ${model}, ${year}`}</h2>{" "}
        <span className={css.carId}>Id: {id}</span>
        <ul className={css.metaList}>
          <li>
            <img src={LocationIcon} alt="Location" className={css.icon} />
            {exctractCityandCountry(address)}
          </li>
          <li>Mileage: {formatMileage(mileage)}</li>
          <li className={css.price}>${rentalPrice}</li>
        </ul>
        <p className={css.description}>{description}</p>
        <div className={css.descriptionList}>
          <h3 className={css.title}> Rental Conditions:</h3>
          <ul className={css.conditionList}>
            {rentalConditions.map((cond, index) => (
              <li className={css.conditionItem} key={index}>
                <img src={CheckedIcon} alt="check" />
                {cond}
              </li>
            ))}
          </ul>
          <h3 className={css.title}>Car specifications:</h3>
          <ul className={css.specList}>
            <li className={css.conditionItem}>
              <img src={CalendarIcon} alt="Year" className={css.icon} /> Year:{" "}
              {year}
            </li>
            <li className={css.conditionItem}>
              <img src={CarIcon} alt="Type" className={css.icon} /> Type: {type}
            </li>
            <li className={css.conditionItem}>
              <img src={FuelPumpIcon} alt="Fuel" className={css.icon} /> Fuel
              Consumption: {fuelConsumption}
            </li>
            <li className={css.conditionItem}>
              <img src={GearIcon} alt="Engine" className={css.icon} /> Engine
              Size: {engineSize}
            </li>
          </ul>
          <h3 className={css.title}>Accessories and functionalities:</h3>
          <ul className={css.featureList}>
            {allFeatures.map((item) => (
              <li className={css.conditionItem} key={item}>
                <img src={CheckedIcon} alt="check" className={css.icon} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
