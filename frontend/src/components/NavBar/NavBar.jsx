import React from "react";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import barrel from "../../assets/barrel.png";
import { useBookings } from "../../hooks/useBookings";

const NavBar = ({ language, setLanguage, handleOpenCreateModal }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { loading } = useBookings();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageToggle = () => {
    setLanguage(!language);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "#262626",
          minHeight: 60,
        }}
      >
        <Box
          sx={{
            width: { xs: 90, sm: 130 },
            height: { xs: 30, sm: 50 },
            ml: { xs: 0, sm: 6 },
          }}
        >
          <img src={barrel} alt="logo" width="100%" />
        </Box>

        {!loading && (
          <Box
            sx={{
              display: "flex",
              gap: { xs: 0, sm: 4 },
              mr: { xs: 0, sm: 6 },
            }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "common.white" }}
              startIcon={
                <Box
                  sx={{
                    width: { xs: 30, sm: 40 },
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`https://flagcdn.com/${language ? "es" : "gb"}.svg`}
                    width="100%"
                    alt="spain"
                  />
                </Box>
              }
            >
              {language ? "ES" : "ENG"}
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              sx={{ mt: 1 }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                sx={{ display: "flex", gap: 1 }}
                onClick={handleLanguageToggle}
              >
                <img
                  src={`https://flagcdn.com/${!language ? "es" : "gb"}.svg`}
                  width={35}
                  alt="spain"
                />
                <span> {!language ? "ES" : "ENG"}</span>
              </MenuItem>
            </Menu>
            <Button
              variant="text"
              sx={{
                color: "common.white",
                fontWeight: 600,
                fontSize: { xs: 11, sm: 12 },
                width: { xs: 100, sm: "100%" },
                height: 40,
                p: 2,
              }}
              onClick={handleOpenCreateModal}
              startIcon={<IoMdAdd />}
            >
              {language ? "Añadir Booking" : "Add booking"}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
