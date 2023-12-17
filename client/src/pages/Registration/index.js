import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../storage";
import Copyright from "../../components/Copyright"

const defaultTheme = createTheme();

export default function Registration() {
  const { setAlert } = useContext(AppContext);
  let navigate = useNavigate();
  const [isValid, setIsValid] = useState({
    isValidEmail: true,
    isValidFirstName: true,
    isValidLastName: true,
    isValidFirstPassword: true,
    isValidSecondPassword: true,
  });

  const isFormValid = (formData) => {
    const { email, firstPassword, secondPassword, firstName, lastName } =
      formData;

    const validationForm = {
      isValidEmail: true,
      isValidFirstName: true,
      isValidLastName: true,
      isValidFirstPassword: true,
      isValidSecondPassword: true,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validationForm.isValidEmail = emailRegex.test(email);
    validationForm.isValidFirstPassword = firstPassword.length >= 6;
    validationForm.isValidSecondPassword = secondPassword === firstPassword && secondPassword !== "";
    validationForm.isValidFirstName = firstName.trim() !== "";
    validationForm.isValidLastName = lastName.trim() !== "";

    setIsValid(validationForm);
    if (Object.values(validationForm).some((value) => value === false)) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      firstPassword: data.get("firstPassword"),
      secondPassword: data.get("secondPassword"),
      password: data.get("firstPassword"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };

    if (!isFormValid(formData)) return;

    const apiUrl = "/iot/user";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setAlert({message: "User created!", type: "success"});
      navigate("/");
      // user successfully created message
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!isValid.isValidFirstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={!isValid.isValidFirstName ? "Field is reuiqred." : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!isValid.isValidLastName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  helperText={!isValid.isValidLastName ? "Field is reuiqred." : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!isValid.isValidEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={!isValid.isValidEmail ? "Not valid email." : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!isValid.isValidFirstPassword}
                  required
                  fullWidth
                  name="firstPassword"
                  label="Password"
                  type="password"
                  id="firstPassword"
                  autoComplete="new-password"
                  helperText={!isValid.isValidFirstPassword ? "Not valid password." : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!isValid.isValidSecondPassword}
                  required
                  fullWidth
                  name="secondPassword"
                  label="Confirm password"
                  type="password"
                  id="secondPassword"
                  autoComplete="new-password"
                  helperText={!isValid.isValidSecondPassword ? "Password mismatch." : ""}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
