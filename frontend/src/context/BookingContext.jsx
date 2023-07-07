import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BookingContext = createContext();

const URL='http://localhost:3000/api/v1/bookings'

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const [showAlert, setShowAlert] = useState(false);

  const [alertLabel, setAlertLabel] = useState("");

  const fetchBookings = async () => {
    setBookings({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const res = await axios.get(URL);
      setBookings({
        data: res.data,
        error: null,
        loading: false,
      });
    } catch (error) {
      setBookings({ ...bookings, error: error.message });
    }
  };

  const createBookings = async ({ status, description }) => {
    try {
      const res = await axios.post(URL, {
        status,
        description,
      });
      const newBooking = res.data;
      setBookings((prevBookings) => ({
        ...prevBookings,
        data: [...prevBookings.data, newBooking],
      }));
      setShowAlert(true);
      setAlertLabel("Booking Sussecully created");
    } catch (error) {
      setBookings({ ...bookings, error: error.message });
    }
  };
  const updateBooking = async (bookingId, updatedData) => {
    try {
      await axios.put(
        `${URL}/${bookingId}`,
        updatedData
      );
      setBookings((prevBookings) => ({
        ...prevBookings,
        data: prevBookings.data.map((booking) =>
          booking.id === bookingId ? { ...booking, ...updatedData } : booking
        ),
      }));
      setShowAlert(true);
      setAlertLabel("Booking Sussecully updated");
    } catch (error) {
      setBookings({ ...bookings, error: error.message });
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`${URL}/${bookingId}`);
      setBookings((prevBookings) => ({
        ...prevBookings,
        data: prevBookings.data.filter((booking) => booking.id !== bookingId),
      }));
    } catch (error) {
      setBookings({ ...bookings, error: error.message });
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BookingContext.Provider
      value={{
        loading: bookings.loading,
        data: bookings.data,
        error: bookings.error,
        createBookings,
        deleteBooking,
        updateBooking,
        showAlert,
        setShowAlert,
        alertLabel,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;
