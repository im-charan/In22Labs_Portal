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
function App() {
  
  const routing = useRoutes(Router);
  const theme = baselightTheme;

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