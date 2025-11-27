import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Clients", icon: <PeopleIcon />, path: "/clients" },
    { text: "Projects", icon: <WorkIcon />, path: "/projects" },
    { text: "Invoices", icon: <ReceiptIcon />, path: "/invoices" },
    { text: "Documentation", icon: <DescriptionIcon />, path: "/documentation" },
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #1976d2, #64b5f6)",
          color: "white",
          borderRight: "none",
          boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Toolbar />
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                borderRadius: "10px",
                mb: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "rgba(255,255,255,0.25)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.35)",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;