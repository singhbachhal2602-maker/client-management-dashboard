import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PendingIcon from "@mui/icons-material/Pending";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const theme = useTheme();
  const API = "http://localhost:5000/api/projects";

  // States
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    deadline: "",
    progress: 0,
    status: "Pending",
  });

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(API);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Form change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save (Add or Update)
  const handleSave = async () => {
    try {
      if (editId) {
        // Update existing
        await axios.put(`${API}/${editId}`, formData);
      } else {
        // Add new
        await axios.post(API, formData);
      }
      setOpen(false);
      setEditId(null);
      setFormData({
        name: "",
        client: "",
        deadline: "",
        progress: 0,
        status: "Pending",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  // Open dialog for edit
  const handleEdit = (project) => {
    setFormData(project);
    setEditId(project._id);
    setOpen(true);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "info";
      case "Pending":
        return "warning";
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
            Projects Overview
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
              setEditId(null);
              setFormData({
                name: "",
                client: "",
                deadline: "",
                progress: 0,
                status: "Pending",
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
            Add Project
          </Button>
        </Box>

        {/* Project Cards */}
        <Grid container spacing={3}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <Grid item xs={12} md={6} key={project._id}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1.5}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {project.name}
                    </Typography>
                    <Chip
                      label={project.status}
                      color={getStatusColor(project.status)}
                      icon={
                        project.status === "Completed" ? (
                          <CheckCircleIcon />
                        ) : project.status === "In Progress" ? (
                          <AccessTimeIcon />
                        ) : (
                          <PendingIcon />
                        )
                      }
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Client: <strong>{project.client}</strong> | Deadline:{" "}
                    <strong>{project.deadline}</strong>
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={project.progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      mb: 2,
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "#e0e0e0"
                          : "rgba(255,255,255,0.1)",
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Progress: {project.progress}%
                  </Typography>

                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Tooltip title="Edit Project">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(project)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Project">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(project._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{ mx: "auto", mt: 3, textAlign: "center", color: "gray" }}
            >
              No projects found. Add one to get started!
            </Typography>
          )}
        </Grid>
      </Paper>

      {/* Shared Dialog (Add + Edit) */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editId ? "Edit Project" : "Add New Project"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Project Name"
            name="name"
            fullWidth
            value={formData.name}
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
            label="Deadline (YYYY-MM-DD)"
            name="deadline"
            fullWidth
            value={formData.deadline}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Progress (%)"
            name="progress"
            type="number"
            fullWidth
            value={formData.progress}
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
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

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
