import { useState, React } from "react";
import {
  Box,
  useMediaQuery,
  Typography,
  useTheme,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton
} from "@mui/material";
import Dropzone from "react-dropzone";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";
import axios from "axios";

const registerSchema = yup.object().shape({
  name: yup.object().shape({
    salutation: yup.string().required("Salutation is required"),
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required")
  }),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact_number: yup
    .string()
    .min(10, "Contact number must be 10 characters")
    .max(10, "Contact number must be 10 characters")
    .required("Contact number is required"),
  address: yup.object().shape({
    no: yup.string().required("Address No is required"),
    street1: yup.string().required("Street1 is required"),
    street2: yup.string(),
    city: yup.string().required("City is required")
  }),
  password: yup.string().required("Password is required"),
  occupation: yup.string(),
  picture: yup.string().required("Profile picture is Required")
});

const initialValuesRegister = {
  name: {
    salutation: "",
    first_name: "",
    middle_name: "",
    last_name: ""
  },
  email: "",
  contact_number: "",
  address: {
    no: "",
    street1: "",
    street2: "",
    city: ""
  },
  password: "",
  occupation: "",
  picture: ""
};

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:960px)");
  // const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const isMobile = useMediaQuery("(min-width:600px)");
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append(
      "name",
      JSON.stringify({
        salutation: values.name.salutation,
        first_name: values.name.first_name,
        middle_name: values.name.middle_name || "",
        last_name: values.name.last_name
      })
    );

    formData.append(
      "address",
      JSON.stringify({
        no: values.address.no,
        street1: values.address.street1,
        street2: values.address.street2 || "",
        city: values.address.city
      })
    );
    formData.append("email", values.email);
    formData.append("contact_number", values.contact_number);
    formData.append("occupation", values.occupation);
    formData.append("password", values.password);
    formData.append("picture", values.picture);

    try {
      const saveUserResponse = await axios.post(
        "http://localhost:3620/api/oauth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const savedUser = saveUserResponse.data;
      console.log(savedUser);
      goToLogin();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const goToLogin = () => {
    navigate("/login");
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
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
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
                <>
                  <FormControl
                    fullWidth
                    error={
                      !!errors.name?.salutation && !!touched.name?.salutation
                    }
                  >
                    <InputLabel id="salutation">Salutation</InputLabel>
                    <Select
                      labelId="salutation"
                      id="salutation"
                      label="Salutation"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("name.salutation", e.target.value);
                      }}
                      defaultValue=""
                      value={values.name?.salutation || ""}
                      name="name.salutation"
                    >
                      <MenuItem value="">Other</MenuItem>
                      <MenuItem value="Mr">Mr</MenuItem>
                      <MenuItem value="Mrs">Mrs</MenuItem>
                    </Select>
                    <FormHelperText
                      error={
                        !!errors.name?.salutation && !!touched.name?.salutation
                      }
                    >
                      {errors.name?.salutation?.message &&
                        touched.name?.salutation.message}
                    </FormHelperText>
                  </FormControl>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.name?.first_name || ""}
                    name="name.first_name"
                    error={
                      !!errors.name?.first_name && !!touched.name?.first_name
                    }
                    helperText={
                      errors.name?.first_name?.message &&
                      touched.name?.first_name.message
                    }
                    sx={{ gridColumn: "span 3" }}
                    {...(errors.name?.first_name &&
                      touched.name?.first_name && {
                        error: true,
                        helperText: errors.name?.first_name
                      })}
                  />
                  <TextField
                    label="Middle Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.name?.middle_name}
                    name="name.middle_name"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.name?.last_name || ""}
                    name="name.last_name"
                    error={
                      !!errors.name?.last_name && !!touched.name?.last_name
                    }
                    helperText={
                      errors.name?.last_name?.message &&
                      touched.name?.last_name.message
                    }
                    sx={{ gridColumn: "span 2" }}
                    {...(errors.name?.last_name &&
                      touched.name?.last_name && {
                        error: true,
                        helperText: errors.name?.last_name
                      })}
                  />
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
                    label="Contact Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact_number || ""}
                    name="contact_number"
                    error={!!errors.contact_number && !!touched.contact_number}
                    helperText={
                      errors.contact_number?.message &&
                      touched.contact_number.message
                    }
                    sx={{ gridColumn: "span 4" }}
                    {...(errors.contact_number &&
                      touched.contact_number && {
                        error: true,
                        helperText: errors.contact_number
                      })}
                  />
                  <TextField
                    label="Address No"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.address?.no || ""}
                    name="address.no"
                    error={!!errors.address?.no && !!touched.address?.no}
                    helperText={
                      errors.address?.no?.message && touched.address?.no.message
                    }
                    sx={{ gridColumn: "span 1" }}
                    {...(errors.address?.no &&
                      touched.address?.no && {
                        error: true,
                        helperText: errors.address?.no
                      })}
                  />
                  <TextField
                    label="Street1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.address?.street1 || ""}
                    name="address.street1"
                    error={
                      !!errors.address?.street1 && !!touched.address?.street1
                    }
                    helperText={
                      errors.address?.street1?.message &&
                      touched.address?.street1.message
                    }
                    sx={{ gridColumn: "span 3" }}
                    {...(errors.address?.street1 &&
                      touched.address?.street1 && {
                        error: true,
                        helperText: errors.address?.street1
                      })}
                  />
                  <TextField
                    label="Street2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.address?.street2}
                    name="address.street2"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="City"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.address?.city || ""}
                    name="address.city"
                    error={!!errors.address?.city && !!touched.address?.city}
                    helperText={
                      errors.address?.city?.message &&
                      touched.address?.city.message
                    }
                    sx={{ gridColumn: "span 2" }}
                    {...(errors.address?.city &&
                      touched.address?.city && {
                        error: true,
                        helperText: errors.address?.city
                      })}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation || ""}
                    name="occupation"
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg, .jpeg , .png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()}></input>
                          {!values.picture ? (
                            <p>Add Picture</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
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
                </>
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
                  SIGN UP
                </Button>
                <Typography
                  onClick={() => {
                    resetForm();
                    goToLogin();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": { color: palette.primary.light }
                  }}
                >
                  Already have an account? Login Here.
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default RegisterPage;
