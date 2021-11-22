import "./App.css";
import Box from "@mui/material/Box";
import EditUser from "./EditUser";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  palette: {
    secondary: {
      main: "#B58B00",
    },
  },
  typography: {
    fontFamily: "tahoma",
  },
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box
          className="App"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <EditUser />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
