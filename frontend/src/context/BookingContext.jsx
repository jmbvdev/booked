import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const fetchBookings = async () => {
    setBookings({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const res = await axios.get("http://localhost:3000/api/v1/bookings");
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
      const res = await axios.post("http://localhost:3000/api/v1/bookings", {
        status,
        description,
      });
      const newBooking = res.data;
      setBookings((prevBookings) => ({
        ...prevBookings,
        data: [...prevBookings.data, newBooking],
      }));
    } catch (error) {
      setBookings({ ...bookings, error: error.message });
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/bookings/${bookingId}`);
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
  }, []);

  return (
    <BookingContext.Provider
      value={{
        loading: bookings.loading,
        data: bookings.data,
        error: bookings.error,
        createBookings,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;
