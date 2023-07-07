import "./App.css";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import BookingCard from "./components/BookingCard/BookingCard";
import { useState } from "react";
import BookingForm from "./components/BookingForm/BookingForm";
import { useBookings } from "./hooks/useBookings";
import PaginationContainer from "./components/PaginationContainer/PaginationContainer";

function App() {
  const { data, loading } = useBookings();

  const [language, setLanguage] = useState(true);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const[isUpdate, setIsUpdate]=useState(false)

  const[actualBooking,setActualBooking]=useState({status:true,description:''})

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setActualBooking({status:true,description:''})
    setOpenCreateModal(false);
    setIsUpdate(false)
  };

  //Pagination-----------------------/

  const [page, setPage] = useState(1);
  const cardsPerPage = 6;
  const handlePageChange = (page) => {
    setPage(page);
  };
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleBookings = data&&data.slice(startIndex, endIndex);

  //////--------------------------/

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <>
        <NavBar
          language={language}
          setLanguage={setLanguage}
          handleOpenCreateModal={handleOpenCreateModal}
        />
        <Container>
          <BookingForm
            open={openCreateModal}
            onClose={handleCloseCreateModal}
            isUpdate={isUpdate}
            booking={actualBooking}
            

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
            {data.length ? (
              <Grid container spacing={4}>
                {
                  visibleBookings.map((booking) => (
                    <Grid item key={booking.id} xs={12} sm={6} lg={4}>
                      <BookingCard booking={booking}  setOpenCreateModal={setOpenCreateModal} setIsUpdate={setIsUpdate} setActualBooking={setActualBooking} />
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <h1>Empty</h1>
            )}
            <PaginationContainer
              data={data}
              cardsPerPage={cardsPerPage}
              onPageChange={handlePageChange}
            />
          </Box>
        </Container>
      </>
    );
  }
}

export default App;
