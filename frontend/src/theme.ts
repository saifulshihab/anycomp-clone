"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    }
  },
  spacing: 4,
  palette: {
    primary: {
      main: "#002F70",
      dark: "#071331"
    }
  }
});
