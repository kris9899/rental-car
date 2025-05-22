import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations";
import {
  selectSelectedCar,
  selectCarsLoading,
} from "../../redux/cars/selectors";
import CarDetails from "../../components/CarDetails/CarDetails";
import Loader from "../../ui/Loader/Loader";
import css from "../CarDetailsPage/CarDetailsPage.module.css";

export default function CarDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCarsLoading);
  const car = useSelector(selectSelectedCar);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;

  if (!car) {
    return (
      <div className={css.wrap}>
        <p className={css.notFound}>Car not found.</p>
      </div>
    );
  }

  return (
    <div className={css.wrap}>
      <CarDetails car={car} />
    </div>
  );
}
