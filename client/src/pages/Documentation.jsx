import { Box, Typography, Paper, Divider, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Documentation() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(145deg, #f0f4f8, #e3f2fd)"
            : "linear-gradient(145deg, #121212, #1e1e1e)",
        minHeight: "100vh",
        p: { xs: 3, md: 5 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: "1000px",
          mx: "auto",
          p: 5,
          borderRadius: "20px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
          📘 Project Documentation
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Client Management Dashboard — MERN Stack Web Application
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Overview
        </Typography>
        <Typography paragraph>
          This full-stack application helps users manage clients, projects, and invoices through
          an interactive dashboard built with the MERN stack (MongoDB, Express, React, Node.js).
          The app allows adding, editing, deleting, and filtering data, all persisted in a MongoDB
          Atlas database and served through an Express API.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
           Features Implemented
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary=" Componentized React app with multiple reusable components (Sidebar, Topbar, Dashboard, Clients, Projects, Invoices)." />
          </ListItem>
          <ListItem>
            <ListItemText primary="State management and props passing between components (e.g., theme toggling, client forms)." />
          </ListItem>
          <ListItem>
            <ListItemText primary=" Event handlers for interactivity, users can add, edit, delete, and filter records in real-time." />
          </ListItem>
          <ListItem>
            <ListItemText primary=" Client-side routing with React Router, separate routes for Dashboard, Clients, Projects, Invoices, Profile, and Documentation." />
          </ListItem>
          <ListItem>
            <ListItemText primary=" RESTful API built using Express with GET, POST, PUT, DELETE endpoints." />
          </ListItem>
          <ListItem>
            <ListItemText primary=" Connected to MongoDB Atlas with three collections: Clients, Projects, and Invoices." />
          </ListItem>
          <ListItem>
            <ListItemText primary=" Axios used for HTTP communication between frontend and backend." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Responsive and user-friendly Material UI interface." />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
           How to Use
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1️ Register and login your credentials either by clicking on login button or profile in sidebar" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2️ Dashboard — View key metrics and recent activity across clients, projects, and invoices." />
          </ListItem>
          <ListItem>
            <ListItemText primary="3️ Clients Page — Add new clients, search/filter them, edit or delete existing ones." />
          </ListItem>
          <ListItem>
            <ListItemText primary="4️ Projects Page — Track project details, update status, and manage records." />
          </ListItem>
          <ListItem>
            <ListItemText primary="5️ Invoices Page — Manage invoices (create, edit, delete, and mark as paid or pending)." />
          </ListItem>
          <ListItem>
            <ListItemText primary="6 Documentation Page — View details of the project (you’re here!)." />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          REST API Routes Implemented
        </Typography>
        <Typography component="div">
          <ul>
            <li><b>GET /api/clients</b> — Get all clients</li>
            <li><b>GET /api/projects</b> — Get all projects</li>
            <li><b>GET /api/invoices</b> — Get all invoices</li>
            <li><b>POST /api/clients</b> — Add new client</li>
            <li><b>PUT /api/clients/:id</b> — Edit client</li>
            <li><b>DELETE /api/clients/:id</b> — Delete client</li>
          </ul>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
           Technologies Used
        </Typography>
        <Typography component="div">
          <ul>
            <li>Frontend: React.js (Vite or CRA), React Router, Axios, Material UI</li>
            <li>Backend: Node.js, Express.js</li>
            <li>Database: MongoDB Atlas (Mongoose ODM)</li>
            <li>Deployment: Render (backend), Vercel (frontend)</li>
          </ul>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Future Improvements
        </Typography>
        <Typography component="div">
          <ul>
            <li> Add authentication and role-based access (Admin vs User)</li>
            <li>Implement charts for financial analytics</li>
            <li> Export invoices and client data as CSV or PDF</li>
            <li> Add notifications or reminders for overdue invoices</li>
          </ul>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" textAlign="center" mt={4}>
          © {new Date().getFullYear()} Client Management Dashboard — Built with the MERN Stack.
        </Typography>
      </Paper>
    </Box>
  );
}
