import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,Button,Typography,Table,TableHead,TableRow,TableCell,TableBody,Dialog, DialogTitle, DialogContent,DialogActions,TextField, Paper,IconButton,Tooltip,InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const theme = useTheme();
  const API = "http://localhost:5000/api/clients";

  const fetchClients = async () => {
    try {
      const res = await axios.get(API);
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpen = () => {
    setFormData({ name: "", email: "", company: "" });
    setEditId(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
  try {
    if (!formData.name || !formData.email || !formData.company) {
      alert("All fields are required!");
      return;
    }

    if (editId) {
      await axios.put(`${API}/${editId}`, formData);
    } else {
      const res = await axios.post(API, formData);
      console.log("✅ Added client:", res.data);
    }

    fetchClients();
    handleClose();
  } catch (err) {
    console.error("Error saving client:", err.response?.data || err.message);
    alert(err.response?.data?.error || "Something went wrong while saving client!");
  }
};

  const handleEdit = (id) => {
    const client = clients.find((c) => c._id === id);
    setFormData(client);
    setEditId(id);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        px: 6,
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(145deg, #f0f4f8 0%, #e3f2fd 100%)"
            : "linear-gradient(145deg, #121212 0%, #1e1e1e 100%)",
        color: theme.palette.text.primary,
        transition: "all 0.4s ease",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "20px",
          maxWidth: "1300px",
          mx: "auto",
          backgroundColor: theme.palette.background.paper,
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          gap={2}
          mb={3}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
          >
            👥 Client Management Dashboard
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              variant="outlined"
              placeholder="Search clients..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: "10px",
                width: 250,
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpen}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: "bold",
              }}
            >
              Add Client
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: "16px" }}>
          <Table>
            <TableHead
              sx={{
                backgroundColor:
                  theme.palette.mode === "light"
                    ? theme.palette.primary.main
                    : "#333",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company</TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow
                    key={client._id}
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(25, 118, 210, 0.08)"
                            : "rgba(255,255,255,0.05)",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.2}>
                        <PersonIcon color="primary" />
                        {client.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.2}>
                        <EmailIcon color="primary" />
                        {client.email}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.2}>
                        <BusinessIcon color="primary" />
                        {client.company}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(client._id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(client._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: "gray" }}>
                    No clients found. Add a new client to get started!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Paper>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {editId ? "Edit Client" : "Add Client"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3, backgroundColor: theme.palette.background.paper }}>
          <TextField
            margin="dense"
            label="Full Name"
            name="name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email Address"
            name="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Company Name"
            name="company"
            fullWidth
            variant="outlined"
            value={formData.company}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ borderRadius: "10px", px: 3 }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
