import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Modal,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useBookings } from "../../hooks/useBookings";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const schema = yup.object().shape({
  status: yup.boolean().required(),
  description: yup.string().min(8).max(150).required(),
});
const BookingUpdateForm = ({
  open,
  onClose,
  booking,
  setActualBooking,
  actualBooking,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showSpinner, setShowSpinner] = useState(false);

  const { updateBooking } = useBookings();

  const onSubmitHandler = async (data) => {
    const { status, description } = data;

    setShowSpinner(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    updateBooking(booking.id, { status, description });

    setActualBooking({
      status: true,
      description: "",
    });

    reset();

    onClose();

    setShowSpinner(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <IoMdClose
          style={{
            position: "absolute",
            right: 10,
            cursor: "pointer",
            top: 10,
          }}
          onClick={onClose}
        />
        <Typography
          variant="h6"
          textTransform="uppercase"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Update Booking
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 14,
            flexDirection: "column",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="status">Estado</InputLabel>
            <Select
              labelId="select-status"
              id="status"
              label="Status"
              defaultValue={actualBooking?.status}
              {...register("status")}
            >
              <MenuItem value={true}>Disponible</MenuItem>
              <MenuItem value={false}>No disponible</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            error={errors.description?.message ? true : false}
            id="description"
            label="Descripción"
            {...register("description")}
            value={actualBooking.description || ""}
            onChange={(e) => {
              if (actualBooking.description !== e.target.value) {
                setActualBooking({
                  ...actualBooking,
                  description: e.target.value,
                });
              }
            }}
            multiline={true}
            rows={5}
            helperText={errors.description?.message}
          />

          <Button
            variant="contained"
            color="error"
            type="submit"
            disabled={showSpinner}
          >
            {showSpinner ? <CircularProgress size={20} /> : "Update"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BookingUpdateForm;
