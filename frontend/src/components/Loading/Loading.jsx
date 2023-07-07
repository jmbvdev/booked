import React from "react";
import NavBar from "../NavBar/NavBar";
import { Box, Container, Divider, Grid, Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Box
          sx={{
            mt: { xs: 2, sm: 8 },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Divider />

          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6].map((booking) => (
              <Grid item key={booking} xs={12} sm={6} lg={4}>
                <Skeleton sx={{ height: 300 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Loading;
