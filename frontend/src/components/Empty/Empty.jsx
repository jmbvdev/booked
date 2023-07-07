import { Stack, Typography } from "@mui/material";
import { BiSolidFolder } from "react-icons/bi";
import React from "react";

const Empty = () => {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <BiSolidFolder style={{ fontSize: "8rem", color: "GrayText" }} />
      <Typography variant="h5" sx={{ color: "GrayText" }}>
        No hay bookings disponibles
      </Typography>
    </Stack>
  );
};

export default Empty;
