import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations";
import { selectCarsLoading } from "../../redux/cars/selectors";
import CarDetails from "../../components/CarDetails/CarDetails";
import Loader from "../../ui/Loader/Loader";
import css from "../CarDetailsPage/CarDetailsPage.module.css";

export default function CarDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCarsLoading);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={css.wrap}>
      <CarDetails />
    </div>
  );
}
