import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./scence/home-page/home-page.jsx";
import LoginPage from "./scence/login-page/login-page.jsx";
import RegisterPage from "./scence/Register-Page/Register-page.jsx";
import ProfilePage from "./scence/profile-page/profile.page.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme.js";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <NavbarPage/> */}
          <Routes>
            {/* Default route redirects to /login */}
            <Route
              path="/"
              element={<Navigate to="/login" replace />}
            ></Route>
            <Route path="/home" element={isAuth? <HomePage/> : <Navigate to="/login"/>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="/register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
            <Route
              path="/profile/:userId"
              element={isAuth? <ProfilePage></ProfilePage> : <Navigate to="/login"/> }
            ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
