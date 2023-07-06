import React, { memo } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";

const BACKGROUND_COLOR = [
  "linear-gradient(90deg, rgba(0,97,148,0) 0%, rgba(15,88,103,0.31976540616246496) 100%)",
  "linear-gradient(90deg, rgba(0,97,148,0) 0%, rgba(0,0,0,0.31976540616246496) 100%)",
];

const BookingCard = memo(({ booking }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        height: 200,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: booking.status ? BACKGROUND_COLOR[0] : BACKGROUND_COLOR[1],
        ":hover": {
          boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.5); ",
        },
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="right"
        gap={1}
        mr={2}
      >
        <Typography
          variant="caption"
          sx={{
            color: "common.black",
            my: 1,
            fontSize: 11,
            fontWeight: "medium",
            textTransform: "uppercase",
          }}
        >
          {booking.status ? "disponible" : "no disponible"}
        </Typography>
        <FaCircle
          style={{ fontSize: 12, color: booking.status ? "green" : "gray" }}
        />
      </Stack>
      <Typography
        variant="subtitle2"
        textAlign="left"
        mx={4}
        color="#5e5e5e"
        sx={{ fontStyle: "oblique" }}
      >
        {booking.description}
      </Typography>
      <Stack direction="row" alignContent="end" m={2} gap={1}>
        <RiDeleteBin6Fill color="#9f2e2e" fontSize={20} cursor="pointer" />
        <BiSolidEditAlt fontSize={20} cursor="pointer" />
      </Stack>
    </Paper>
  );
});

export default BookingCard;
