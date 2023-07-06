import { useState } from "react";
import { Pagination } from "@mui/material";
import React from "react";

const PaginationContainer = ({ data, cardsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const [page, setPage] = useState(1);

  const handleChange = (_, value) => {
    setPage(value);
    onPageChange(value);
  };

  return (
    <Pagination
      page={page}
      onChange={handleChange}
      count={totalPages}
      sx={{ m: 4 }}
    />
  );
};

export default PaginationContainer;
