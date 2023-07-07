import "./App.css";
import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import BookingCard from "./components/BookingCard/BookingCard";
import { useState } from "react";
import BookingCreateForm from "./components/BookingCreateForm/BookingCreateForm";
import { useBookings } from "./hooks/useBookings";
import PaginationContainer from "./components/PaginationContainer/PaginationContainer";
import BookingUpdateForm from "./components/BookingUpdateForm/BookingUpdateForm";
import Loading from "./components/Loading/Loading";
import Empty from "./components/Empty/Empty";

function App() {
  const { data, loading, showAlert, setShowAlert, alertLabel } = useBookings();

  const [language, setLanguage] = useState(true);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [actualBooking, setActualBooking] = useState({});

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCloseUpdateModal = () => {
    setActualBooking({ ...actualBooking });
    setOpenUpdateModal(false);
  };

  //Pagination-----------------------/

  const [page, setPage] = useState(1);
  const cardsPerPage = 6;
  const handlePageChange = (page) => {
    setPage(page);
  };
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleBookings = data && data.slice(startIndex, endIndex);

  //////--------------------------/

  if (loading) {
    return <Loading />;
  } else if (data) {
    return (
      <>
        <NavBar
          language={language}
          setLanguage={setLanguage}
          handleOpenCreateModal={handleOpenCreateModal}
        />
        <Container>
          <BookingCreateForm
            open={openCreateModal}
            onClose={handleCloseCreateModal}
            language={language}
          />
          <BookingUpdateForm
            open={openUpdateModal}
            onClose={handleCloseUpdateModal}
            booking={actualBooking}
            setActualBooking={setActualBooking}
            actualBooking={actualBooking}
          />

          <Box
            sx={{
              mt: { xs: 2, sm: 4 },
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Typography variant="h4" component="h1" textTransform="uppercase">
              {language ? "bookings disponibles " : "Bookings available"}
            </Typography>

            <Divider />
            {visibleBookings.length ? (
              <Grid container spacing={4}>
                {visibleBookings.map((booking) => (
                  <Grid item key={booking.id} xs={12} sm={6} lg={4}>
                    <BookingCard
                      booking={booking}
                      setActualBooking={setActualBooking}
                      setOpenUpdateModal={setOpenUpdateModal}
                      language={language}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Empty />
            )}

            {visibleBookings.length && (
              <PaginationContainer
                data={data}
                cardsPerPage={cardsPerPage}
                onPageChange={handlePageChange}
              />
            )}
            {showAlert && (
              <Alert severity="success" onClose={() => setShowAlert(false)}>
                {alertLabel}
              </Alert>
            )}
          </Box>
        </Container>
      </>
    );
  }
}

export default App;
