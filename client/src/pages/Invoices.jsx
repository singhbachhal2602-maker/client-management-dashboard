import {Box,Typography,Paper,Table,TableHead,TableRow,TableCell,TableBody,IconButton,Tooltip,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,Chip,MenuItem,} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Invoices() {
  const theme = useTheme();
  const API = "http://localhost:5000/api/invoices";

  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    client: "",
    amount: "",
    status: "Pending",
    date: "",
  });

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(API);
      setInvoices(res.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  try {
    const dataToSend = {
      ...formData,
      amount: Number(formData.amount),
      date: formData.date || new Date(),
    };

    console.log(" Sending invoice:", dataToSend); // debug log

    if (!dataToSend.invoiceNumber || !dataToSend.client || !dataToSend.amount) {
      alert("Please fill all required fields before saving!");
      return;
    }

    if (editId) {
      await axios.put(`${API}/${editId}`, dataToSend);
    } else {
      await axios.post(API, dataToSend);
    }

    setOpen(false);
    setEditId(null);
    setFormData({
      invoiceNumber: "",
      client: "",
      amount: "",
      status: "Pending",
      date: "",
    });
    fetchInvoices();
  } catch (err) {
    console.error(" Error saving invoice:", err.response?.data || err.message);
    alert("Failed to save invoice. Check console for details.");
  }
};


  const handleEdit = (invoice) => {
    setFormData(invoice);
    setEditId(invoice._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchInvoices();
    } catch (err) {
      console.error("Error deleting invoice:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      case "Overdue":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(145deg, #f4f6f8, #e3f2fd)"
            : "linear-gradient(145deg, #121212, #1c1c1c)",
        minHeight: "100vh",
        p: { xs: 3, md: 5 },
        transition: "all 0.3s ease",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: "20px",
          maxWidth: "1200px",
          mx: "auto",
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          mb={4}
          gap={2}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
          >
             Invoice Management
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
              setEditId(null);
              setFormData({
                invoiceNumber: "",
                client: "",
                amount: "",
                status: "Pending",
                date: "",
              });
            }}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              px: 3,
              py: 1,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #1976d2, #64b5f6)",
              "&:hover": {
                background: "linear-gradient(90deg, #1565c0, #42a5f5)",
              },
            }}
          >
            Add Invoice
          </Button>
        </Box>

        {/* Invoices Table */}
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Client</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount ($)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.length > 0 ? (
              invoices.map((invoice, i) => (
                <TableRow key={invoice._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Chip label={invoice.status} color={getStatusColor(invoice.status)} />
                  </TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(invoice)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(invoice._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog (Add/Edit) */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit Invoice" : "Add Invoice"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Invoice Number"
            name="invoiceNumber"
            fullWidth
            value={formData.invoiceNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Client"
            name="client"
            fullWidth
            value={formData.client}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Amount ($)"
            name="amount"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            label="Status"
            name="status"
            fullWidth
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
