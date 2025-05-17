import * as Yup from "yup";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const bookingValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name should have at least 3 characters")
    .max(33, "Name should have at most 33 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .max(64, "Email should have at most 64 characters")
    .required("Email is required"),

  bookingDate: Yup.date()
    .typeError("Please enter a valid date")
    .min(tomorrow, "Booking date must be from tomorrow or later")
    .required("Date is required"),

  comment: Yup.string().trim(),
});
