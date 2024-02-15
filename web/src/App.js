import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./scence/home-page/home-page.jsx";
import LoginPage from "./scence/login-page/login-page.jsx";
// import NavbarPage from "./scence/navbar/navbar.page.jsx";
import ProfilePage from "./scence/profile-page/profile.page.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme.js";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <NavbarPage/> */}
          <Routes>
            <Route path="/Home" element={<HomePage></HomePage>}></Route>
            <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/register" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="/profile/:userId"
              element={<ProfilePage></ProfilePage>}
            ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
