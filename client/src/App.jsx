// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { baselightTheme } from "./theme/DefaultColors";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './views/authentication/auth/AuthProvider';
import { UserProvider} from './views/authentication/auth/UserContext';
import { useEffect } from 'react';

function App() {
  
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  document.addEventListener('contextmenu', (e) => e.preventDefault());

  function ctrlShiftKey(e, keyCode) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  }

  // document.onkeydown = (e) => {
  //   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  //   if (
  //     event.keyCode === 123 ||
  //     ctrlShiftKey(e, 'I') ||
  //     ctrlShiftKey(e, 'J') ||
  //     ctrlShiftKey(e, 'C') ||
  //     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  //   )
  //     return false;
  // };

  return (
    <AuthProvider>
       <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
      </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App