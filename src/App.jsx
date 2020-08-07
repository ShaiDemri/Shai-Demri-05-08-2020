import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useMediaQuery } from "@material-ui/core";
import AppBar from "./components/AppBar";
import ErrorBoundary from "./components/ErrorBoundary";
import AppModule from "./module/AppModule";

function App() {
  const [colorScheme, setColorScheme] = React.useState("dark");
  const prefersDarkMode = useMediaQuery(
    `(prefers-color-scheme: ${colorScheme})`
  );

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
        breakpoints: {
          keys: ["xs", "sm", "md", "lg", "xl", "tablet", "laptop", "desktop"],
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            tablet: 640,
            laptop: 1024,
            desktop: 1280,
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar colorScheme={colorScheme} setColorScheme={setColorScheme} />
      <ErrorBoundary>
        <BrowserRouter>
          <AppModule />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
