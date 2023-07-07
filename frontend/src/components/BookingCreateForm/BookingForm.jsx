import React from "react";
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
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useBookings } from "../../hooks/useBookings";

const styleModal = {
  position: "absolute",
  height:'50%',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 400 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const schema = yup.object().shape({
  status: yup.boolean().required(),
  description: yup.string().min(8).max(150).required(),
});

const BookingForm = ({ open, onClose, isUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { createBookings } = useBookings();

  const onSubmitHandler = (data) => {
    const { status, description } = data;
    createBookings({ status, description });
    reset();
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
          {isUpdate ? "Update Booking" : "Create Booking"}
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
              name="status"
              defaultValue={true}
              label="Status"
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
            multiline
            rows={3}
            helperText={errors.description?.message}
          />

          <Button variant="contained" color="error" type="submit">
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BookingForm;
