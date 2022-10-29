import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthUserProvider } from './firebase/auth';
import Login from './pages/auth/Login';
import AddSuggestion from './pages/client/AddSuggestion';
import Suggestions from './pages/dashboard/Suggestions';

const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
});

function App() {
  return (
    <>
      <SnackbarProvider>
        <AuthUserProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<AddSuggestion />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Suggestions />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </AuthUserProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
