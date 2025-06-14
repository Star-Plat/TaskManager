import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeContextProvider, ThemeContext } from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme';
import GlobalStyles from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ThemeWrapper />
    </ThemeContextProvider>
  </React.StrictMode>
);

// A wrapper to apply styled-components theme based on context
function ThemeWrapper() {
  const { theme } = React.useContext(ThemeContext);
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={selectedTheme}>
      <GlobalStyles />
      <App />
    </StyledThemeProvider>
  );
}

reportWebVitals();
