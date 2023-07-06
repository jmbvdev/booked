import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

export const useBookings = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }
  return context;
};
