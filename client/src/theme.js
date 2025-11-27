import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: { default: "#f4f6f8", paper: "#ffffff" },
          primary: { main: "#1976d2" },
          text: { primary: "#000", secondary: "#333" },
        }
      : {
          background: { default: "#121212", paper: "#1e1e1e" },
          primary: { main: "#90caf9" },
          text: { primary: "#fff", secondary: "#ccc" },
        }),
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
