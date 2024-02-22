// import { Box, useMediaQuery, Typography, useTheme } from "@mui/material";
// import Form from "../login-page/form";

// const LoginPage = () => {
//   const theme = useTheme();
//   const isNonMobileScreens = useMediaQuery("(min-width:960px)");
//   return (
//     <Box>
//       <Box>
//         <Typography
//           fontWeight="bold"
//           fontSize="32px"
//           color="primary"
//           display="flex"
//           justifyContent="center"
//           mt="10px"
//         >
//           Sociafy
//         </Typography>
//       </Box>
//       <Box
//         width={isNonMobileScreens ? "50%" : "93%"}
//         p="2rem"
//         m="2rem auto"
//         borderRadius="1.5rem"
//         backgroundColor={theme.palette.background.alt}
//       >
//         <Typography
//           fontWeight="bold"
//           variant="h4"
//           sx={{
//             mb: "2rem"
//           }}
//         >
//           Welcome to Sociafy
//         </Typography>
//         <Form></Form>
//       </Box>
//     </Box>
//   );
// };
// export default LoginPage;

// LoginForm.jsx
// LoginForm.jsx

import { useState } from "react";
import {
  Box,
  useMediaQuery,
  Typography,
  useTheme,
  Button,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import axios from "axios";
// import FlexBetween from "../../components/FlexBetween";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required")
});

const initialValuesLogin = {
  email: "",
  password: ""
};

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:960px)");
  // const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const isMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  const login = async (values, onSubmitProps) => {
    const loggedResponse = await axios.post(
      "http://localhost:3620/api/oauth/login",
      values,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    const loggedIn = await loggedResponse.data;
    //TODO loggedIn.user is not coming from backend
    onSubmitProps.resetForm(loggedIn);
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      );
      navigate("/home");
    }
  };

  const onSignUp = () => {
    navigate("/register");
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box>
      <Box>
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          display="flex"
          justifyContent="center"
          mt="10px"
        >
          Sociafy
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="bold"
          variant="h4"
          sx={{
            mb: "2rem"
          }}
        >
          Welcome to Sociafy
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isMobile ? undefined : "span 4" }
                }}
              >
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!errors.email && !!touched.email}
                  helperText={errors.email?.message && touched.email.message}
                  sx={{ gridColumn: "span 4" }}
                  {...(errors.email &&
                    touched.email && {
                      error: true,
                      helperText: errors.email
                    })}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!errors.password && !!touched.password}
                  helperText={
                    errors.password?.message && touched.password.message
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ gridColumn: "span 4" }}
                  {...(errors.password &&
                    touched.password && {
                      error: true,
                      helperText: errors.password
                    })}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main }
                  }}
                >
                  LOGIN
                </Button>
                <Typography
                  onClick={() => {
                    // setPageType("login");
                    resetForm();
                    onSignUp();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": { color: palette.primary.light }
                  }}
                >
                  Don't have an account? Sign Up here.
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;
