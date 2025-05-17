import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingBtn from "../../ui/LoadingBtn/LoadingBtn";
import { selectCarsLoading } from "../../redux/cars/selectors";
import { bookingValidationSchema } from "../../validations/bookingValidationSchema";
import css from "../BookingForm/BookingForm.module.css";

export default function BookingForm({ carName }) {
  const isLoading = useSelector(selectCarsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(bookingValidationSchema),
    mode: "onSubmit",
  });

  const handleFormSubmit = (data) => {
    toast.success(`You’ve booked ${carName} successfully!`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <fieldset className={css.fieldset} disabled={isLoading}>
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>
        <div className={css.wrap}>
          <label className={css.label}>
            <input {...register("name")} type="text" placeholder="Name*" />
          </label>
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>

        <div className={css.wrap}>
          <label className={css.label}>
            <input {...register("email")} type="email" placeholder="Email*" />
          </label>
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.wrap}>
          <label className={css.label}>
            <input
              {...register("bookingDate")}
              type="date"
              placeholder="Booking date"
            />
          </label>
          {errors.bookingDate && (
            <p className={css.error}>{errors.bookingDate.message}</p>
          )}
        </div>

        <div className={css.wrap}>
          <label className={css.label}>
            <input {...register("comment")} type="text" placeholder="Comment" />
          </label>
          {errors.comment && (
            <p className={css.error}>{errors.comment.message}</p>
          )}
        </div>

        <LoadingBtn
          isLoading={isLoading}
          type="submit"
          className={css.loginBtn}
        >
          Send
        </LoadingBtn>
      </fieldset>
    </form>
  );
}
