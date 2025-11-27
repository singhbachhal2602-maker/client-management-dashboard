import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/auth";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const endpoint = tab === 0 ? "/login" : "/register";
      const res = await axios.post(API + endpoint, form);
      alert(res.data.message);

      if (tab === 0) {
        //  Save username for Topbar
        localStorage.setItem("username", form.username);
        navigate("/"); // redirect to Dashboard
      }
    } catch (err) {
      console.error("Auth error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #64b5f6, #1976d2)",
      }}
    >
      <Paper sx={{ p: 4, width: 400, borderRadius: "16px" }}>
        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #1976d2, #64b5f6)",
          }}
          onClick={handleSubmit}
        >
          {tab === 0 ? "Login" : "Register"}
        </Button>
      </Paper>
    </Box>
  );
}
