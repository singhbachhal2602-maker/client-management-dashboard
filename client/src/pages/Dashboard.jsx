import { useState, useEffect } from "react";
import axios from "axios";
import {Box,Typography,Grid,Paper,Divider,useMediaQuery,} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [clientCount, setClientCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [recentClients, setRecentClients] = useState([]);

  // API endpoints
  const API_CLIENTS = "http://localhost:5000/api/clients";
  const API_PROJECTS = "http://localhost:5000/api/projects";
  const API_INVOICES = "http://localhost:5000/api/invoices";

  useEffect(() => {
    // Fetch clients
    axios
      .get(API_CLIENTS)
      .then((res) => {
        setClientCount(res.data.length);
        setRecentClients(res.data.slice(-5).reverse());
      })
      .catch((err) => console.error("Error fetching clients:", err));

    // Fetch projects
    axios
      .get(API_PROJECTS)
      .then((res) => setProjectCount(res.data.length))
      .catch((err) => console.error("Error fetching projects:", err));

    // Fetch invoices
    axios
      .get(API_INVOICES)
      .then((res) => setInvoiceCount(res.data.length))
      .catch((err) => console.error("Error fetching invoices:", err));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        p: { xs: 2, md: 3 },
        minHeight: "100vh",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight="bold"
        color="primary"
        mb={4}
      >
       Dashboard Overview
      </Typography>

      {/* Stats */}
      <Grid container spacing={3}>
        {/* Clients */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: "16px",
              textAlign: "center",
              background: "linear-gradient(135deg, #1976d2, #64b5f6)",
              color: "white",
            }}
          >
            <PeopleAltIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Total Clients</Typography>
            <Typography variant="h3" fontWeight="bold">
              {clientCount}
            </Typography>
          </Paper>
        </Grid>

        {/* Projects */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: "16px",
              textAlign: "center",
              background: "linear-gradient(135deg, #43a047, #66bb6a)",
              color: "white",
            }}
          >
            <WorkIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Total Projects</Typography>
            <Typography variant="h3" fontWeight="bold">
              {projectCount}
            </Typography>
          </Paper>
        </Grid>

        {/* Invoices */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: "16px",
              textAlign: "center",
              background: "linear-gradient(135deg, #f57c00, #ffb74d)",
              color: "white",
            }}
          >
            <ReceiptIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Total Invoices</Typography>
            <Typography variant="h3" fontWeight="bold">
              {invoiceCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Clients */}
      <Paper
        elevation={5}
        sx={{
          mt: 6,
          p: 3,
          borderRadius: "20px",
          background:
            theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Recent Clients
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {recentClients.length > 0 ? (
          recentClients.map((client) => (
            <Box
              key={client._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 1.5,
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Typography fontWeight="500">{client.name}</Typography>
              <Typography color="text.secondary">{client.company}</Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">
            No recent clients found.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
