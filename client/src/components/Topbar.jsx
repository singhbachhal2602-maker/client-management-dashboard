import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Avatar,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Topbar({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isLoggedIn = Boolean(username);
  const initial = username ? username.charAt(0).toUpperCase() : "";

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("username");
      navigate("/profile");
    } else {
      navigate("/profile");
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          mode === "light"
            ? "linear-gradient(90deg, #1976d2, #64b5f6)"
            : "linear-gradient(90deg, #0d47a1, #1e88e5)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: App Name */}
        <Typography variant="h6" fontWeight="bold">
          Client Management Dashboard
        </Typography>

        {/* Right: Controls */}
        <Box display="flex" alignItems="center" gap={2}>

          {/* Show Avatar if logged in */}
          {isLoggedIn ? (
            <>
              <Tooltip title={username}>
                <Avatar
                  sx={{
                    bgcolor: "white",
                    color: "#1976d2",
                    fontWeight: "bold",
                  }}
                >
                  {initial}
                </Avatar>
              </Tooltip>

              <IconButton color="inherit" onClick={handleLoginLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={handleLoginLogout}
              sx={{
                borderColor: "white",
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
