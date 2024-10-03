import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { X } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CamperBookingForm.module.css";

const bookingValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Wrong email").required("Email required"),
  date: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Date required"),
  comment: Yup.string(),
});

const Warning = ({ children, onClose }) => (
  <div className={styles.warning}>
    {children}
    <X className={styles.closeIcon} onClick={onClose} />
  </div>
);

const CamperBookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleBookingSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setIsNotificationVisible(true);
      setSubmitting(false);
      resetForm();
      setSelectedDate(null);
      setTimeout(() => setIsNotificationVisible(false), 5000);
    }, 400);
  };

  return (
    <div className={styles.CamperBookingForm}>
      <h2>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you.</p>
      {isNotificationVisible && (
        <Warning onClose={() => setIsNotificationVisible(false)}>
          Booking successful! We will contact you soon.
        </Warning>
      )}
      <Formik
        initialValues={{ name: "", email: "", date: null, comment: "" }}
        bookingValidationSchema={bookingValidationSchema}
        onSubmit={handleBookingSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={styles.formField}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMessage}
            />

            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={styles.formField}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />

            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setFieldValue("date", date);
              }}
              dateFormat="d MMMM, yyyy"
              className={`${styles.datePicker} ${styles.formField}`}
              calendarClassName={styles.customCalendar}
              placeholderText="Booking date*"
              minDate={new Date()}
            />
            <ErrorMessage
              name="date"
              component="div"
              className={styles.errorMessage}
            />

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={`${styles.formField} ${styles.comment}`}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CamperBookingForm;
