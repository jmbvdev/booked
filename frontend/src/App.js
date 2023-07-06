import "./App.css";
import {
  Box,
  Container,
  Divider,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import BookingCard from "./components/BookingCard/BookingCard";
import { useState } from "react";

function App() {
  const bookings = [
    {
      id: 1,
      status: true,
      description:
        "Lack of direction, not lack of time, is the problem. We all have twenty-four hour days.",
    },
    {
      id: 2,
      status: false,
      description: "Winners never quit and quitters never win.",
    },
    {
      id: 3,
      status: true,
      description:
        "Most great people have achieved their greatest success just one step beyond their greatest failure.",
    },
    {
      id: 4,
      status: false,
      description:
        "One day, in retrospect, the years of struggle will strike you as the most beautiful.",
    },
    { id: 5, status: true, description: "Este es el quinto booking" },
    { id: 6, status: true, description: "Este es el sexto booking" },
    { id: 7, status: true, description: "Este es el septimo booking" },
    { id: 8, status: true, description: "Este es el octavo booking" },
    { id: 9, status: true, description: "Este es el noveno booking" },
  ];
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState(true);
  const cardsPerPage = 6;
  const totalPages = Math.ceil(bookings.length / cardsPerPage);

  const handleChange = (_, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleBookings = bookings.slice(startIndex, endIndex);

  return (
    <>
      <NavBar language={language} setLanguage={setLanguage} />
      <Container >
        <Box
          sx={{
            mt: { xs: 2, sm: 4 },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            gap:{ xs: 2, sm: 4 }
          }}
        >
          <Typography variant="h4" component="h1" textTransform='uppercase'>
            {
              language?
              'bookings disponibles ':
              'Bookings available'
            }
          </Typography>

          <Divider />
          <Grid container spacing={4} >
            {visibleBookings.map((booking) => (
              <Grid item key={booking.id} xs={12} sm={6}  lg={4}>
                <BookingCard booking={booking} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            page={page}
            onChange={handleChange}
            count={totalPages}
            sx={{ m: 4 }}
          />
        </Box>
      </Container>
    </>
  );
}

export default App;
