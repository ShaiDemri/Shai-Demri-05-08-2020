import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { useMediaQuery, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import configureStore from "./store";
import AppBar from "./components/AppBar";
import AppModule from "./module/AppModule";
import ErrorBoundary from "./components/ErrorBoundary";

const initialState = {
  weather: [],
  oneDayWeather: [],
  favorite: [],
};
let store = configureStore(initialState);

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppBar colorScheme={colorScheme} setColorScheme={setColorScheme} />
          <ErrorBoundary>
            <AppModule />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
