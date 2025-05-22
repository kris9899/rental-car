import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingBtn from "../../ui/LoadingBtn/LoadingBtn";
import { selectCarsLoading } from "../../redux/cars/selectors";
import { bookingValidationSchema } from "../../validations/bookingValidationSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "../BookingForm/BookingForm.module.css";
import "../../styles/datepicker.css";

export default function BookingForm({ carName }) {
  const isLoading = useSelector(selectCarsLoading);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(bookingValidationSchema),
    mode: "onSubmit",
    defaultValues: {
      bookingDate: null,
    },
  });

  const handleFormSubmit = (data) => {
    toast.success(`You’ve booked ${carName} successfully!`);
    reset();
    setStartDate(null);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
      <fieldset className={css.formFieldset} disabled={isLoading}>
        <h3 className={css.formTitle}> Book your car now</h3>
        <p className={css.formText}>
          Stay connected! We are always ready to help you.
        </p>
        <div className={css.formWrap}>
          <label className={css.formLabel}>
            <input
              className={css.formInput}
              {...register("name")}
              type="text"
              placeholder="Name*"
              autoComplete="off"
            />
          </label>
          {errors.name && (
            <p className={css.formError}>{errors.name.message}</p>
          )}
        </div>

        <div className={css.formWrap}>
          <label className={css.formLabel}>
            <input
              className={css.formInput}
              {...register("email")}
              type="email"
              placeholder="Email*"
              autoComplete="off"
            />
          </label>
          {errors.email && (
            <p className={css.formError}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.formWrap}>
          <label className={css.formLabel}>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setValue("bookingDate", date);
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="Booking date"
              className={css.formInput}
            />
          </label>
          {errors.bookingDate && (
            <p className={css.formError}>{errors.bookingDate.message}</p>
          )}
        </div>

        <div className={`${css.formWrap} ${css.commentInput}`}>
          <label className={css.formLabel}>
            <input
              className={css.formInput}
              {...register("comment")}
              type="text"
              placeholder="Comment"
              autoComplete="off"
            />
          </label>
          {errors.comment && (
            <p className={css.formError}>{errors.comment.message}</p>
          )}
        </div>

        <LoadingBtn isLoading={isLoading} type="submit" className={css.sendBtn}>
          Send
        </LoadingBtn>
      </fieldset>
    </form>
  );
}
