import { useSelector } from "react-redux";
import css from "../CarDetails/CarDetails.module.css";
import { selectSelectedCar } from "../../redux/cars/selectors";
import { exctractCityandCountry } from "../../utils/extractCityandCountry";

import BookingForm from "../BookingForm/BookingForm";

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

  const formatMileage = (km) =>
    `${new Intl.NumberFormat("uk-UA").format(km)} km`;

  return (
    <section className={css.carDetails}>
      <div className={css.layout}>
        <img className={css.carImg} src={img} alt={`${brand} ${model}`} />

        <BookingForm carName={`${brand} ${model}`} />

        <div className={css.details}>
          <h2 className={css.title}>
            {`${brand} ${model}, ${year}`}
            <span className={css.carId}>Id: {id}</span>
          </h2>

          <ul className={css.metaList}>
            <li>
              <img src={LocationIcon} alt="Location" />
              {exctractCityandCountry(address)}
            </li>
            <li>Mileage: {formatMileage(mileage)}</li>
            <li className={css.price}>${rentalPrice}</li>
          </ul>

          <p className={css.description}>{description}</p>

          <h3>Rental Conditions:</h3>
          <ul className={css.conditionList}>
            {rentalConditions.map((cond, index) => (
              <li key={index}>
                <img src={CheckedIcon} alt="check" />
                {cond}
              </li>
            ))}
          </ul>

          <h3>Car specifications:</h3>
          <ul className={css.specList}>
            <li>
              <img src={CalendarIcon} alt="Year" /> Year: {year}
            </li>
            <li>
              <img src={CarIcon} alt="Type" /> Type: {type}
            </li>
            <li>
              <img src={FuelPumpIcon} alt="Fuel" /> Fuel Consumption:{" "}
              {fuelConsumption}
            </li>
            <li>
              <img src={GearIcon} alt="Engine" /> Engine Size: {engineSize}
            </li>
          </ul>

          <h3>Accessories and functionalities:</h3>
          <ul className={css.featureList}>
            {allFeatures.map((item) => (
              <li key={item}>
                <img src={CheckedIcon} alt="check" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
