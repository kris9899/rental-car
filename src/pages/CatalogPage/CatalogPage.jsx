import { useDispatch, useSelector } from "react-redux";
import CarsList from "../../components/CarsList/CarsList";
import { selectCarsLoading } from "../../redux/cars/selectors";
import { selectFilters } from "../../redux/filters/selectors";
import { resetFilters } from "../../redux/filters/slice";
import { useState, useEffect, useRef } from "react";
import { fetchCars } from "../../redux/cars/operations";
import { resetCars } from "../../redux/cars/slice";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import { selectCars, selectTotalPages } from "../../redux/cars/selectors";
import Loader from "../../ui/Loader/Loader";
import css from "../CatalogPage/CatalogePage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const isLoading = useSelector(selectCarsLoading);
  const cars = useSelector(selectCars);
  const totalPages = useSelector(selectTotalPages);

  const [page, setPage] = useState(1);
  const prevFiltersRef = useRef(filters);
  const loadMoreRef = useRef(null);
  const prevCarsCountRef = useRef(0);

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(resetCars());
    setPage(1);
    prevFiltersRef.current = filters;
    dispatch(fetchCars({ page: 1 }));
  }, []);

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const filtersChanged =
      JSON.stringify(prevFilters) !== JSON.stringify(filters);

    if (filtersChanged) {
      prevFiltersRef.current = filters;
      setPage(1);
      dispatch(resetCars());
      dispatch(fetchCars({ ...filters, page: 1 }));
    }
  }, [filters, dispatch]);

  useEffect(() => {
    if (page === 1) return;
    dispatch(fetchCars({ ...filters, page }));
  }, [page, filters, dispatch]);

  useEffect(() => {
    if (page === 1 || isLoading) {
      prevCarsCountRef.current = cars.length;
      return;
    }

    const prevCount = prevCarsCountRef.current;
    const newCard = document.querySelectorAll("[data-car-card]")[prevCount];

    if (newCard) {
      newCard.scrollIntoView({ behavior: "smooth" });
      prevCarsCountRef.current = cars.length;
    }
  }, [cars]);

  const handleChangePage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className={css.section}>
      <FilterPanel />
      {isLoading && <Loader />}
      {!isLoading && cars.length === 0 && (
        <p className={css.emptyMessage}>
          No cars found. Try changing the filters.
        </p>
      )}
      {cars.length > 0 && <CarsList />}
      {cars.length > 0 && page < totalPages && (
        <div ref={loadMoreRef}>
          <LoadMoreBtn handleChangePage={handleChangePage} />
        </div>
      )}
    </section>
  );
}
