import React, { useContext, useEffect, useState } from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../storage";
import { CircularProgress } from "@mui/material";

const defaultTheme = createTheme();

export default function Account() {
  const { setAlert, user = {} } = useContext(AppContext);

  let navigate = useNavigate();
  const [isProfileValid, setIsProfileValid] = useState({
    isValidFirstName: true,
    isValidLastName: true,
    isValidEmail: true,
  });
  const [isSecurityValid, setIsSecurityValid] = useState({
    isValidOldPassword: true,
    isValidNewPassword: true,
    isValidConfirmPassword: true,
  });

  const isProfileFormValid = (formData) => {
    const { email, firstName, lastName } = formData;

    const validationForm = {
      isValidFirstName: true,
      isValidLastName: true,
      isValidEmail: true,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validationForm.isValidEmail = emailRegex.test(email);
    validationForm.isValidFirstName = firstName.trim() !== "";
    validationForm.isValidLastName = lastName.trim() !== "";

    setIsProfileValid(validationForm);
    if (Object.values(validationForm).some((value) => value === false)) {
      return false;
    } else {
      return true;
    }
  };

  const isSecurityFormValid = (formData) => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    const validationForm = {
      isValidOldPassword: true,
      isValidNewPassword: true,
      isValidConfirmPassword: true,
    };

    validationForm.isValidOldPassword = currentPassword.length >= 6;
    validationForm.isValidNewPassword = newPassword.length >= 6;
    validationForm.isValidConfirmPassword =
      confirmPassword === newPassword && confirmPassword !== "";

    setIsSecurityValid(validationForm);
    if (Object.values(validationForm).some((value) => value === false)) {
      return false;
    } else {
      return true;
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
    };

    if (!isProfileFormValid(formData)) return;

    const apiUrl = "/iot/user";
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, ...formData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setAlert({ message: "User is updated!", type: "success" });
    } catch (error) {
      setAlert({ message: "User not updated!", type: "error" });
      console.error("Error:", error.message);
    }
  };

  const handleSecuritySubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      userId: user.id.id,
      currentPassword: data.get("currentPassword"),
      newPassword: data.get("newPassword"),
      confirmPassword: data.get("confirmPassword"),
    };

    if (!isSecurityFormValid(formData)) return;

    const apiUrl = "/iot/auth/changePassword";
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
      setAlert({ message: "Password is updated!", type: "success" });
    } catch (error) {
      setAlert({ message: "Password not updated!", type: "error" });
      console.error("Error:", error.message);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {user ? (<Grid container>
        <Grid item xs={12} xl={6} sx={{ px: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleProfileSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    defaultValue={user.firstName}
                    error={!isProfileValid.isValidFirstName}
                    helperText={
                      !isProfileValid.isValidFirstName
                        ? "Field is required."
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    defaultValue={user.lastName}
                    error={!isProfileValid.isValidLastName}
                    helperText={
                      !isProfileValid.isValidLastName
                        ? "Field is required."
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    defaultValue={user.email}
                    error={!isProfileValid.isValidEmail}
                    helperText={
                      !isProfileValid.isValidEmail ? "Not valid email." : ""
                    }
                  />
                </Grid>
              </Grid>
              <Button
              id="submit-profile"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} xl={6} sx={{ px: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Security
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSecuritySubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="currentPassword"
                    label="Old password"
                    type="password"
                    id="currentPassword"
                    autoComplete="new-password"
                    error={!isSecurityValid.isValidOldPassword}
                    helperText={
                      !isSecurityValid.isValidOldPassword
                        ? "Not valid password."
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="newPassword"
                    label="New password"
                    type="password"
                    id="newPassword"
                    autoComplete="new-password"
                    error={!isSecurityValid.isValidNewPassword}
                    helperText={
                      !isSecurityValid.isValidNewPassword
                        ? "Not valid password."
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    error={!isSecurityValid.isValidConfirmPassword}
                    helperText={
                      !isSecurityValid.isValidConfirmPassword
                        ? "Password mismatch."
                        : ""
                    }
                  />
                </Grid>
              </Grid>
              <Button
                id="submit-security"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', minHeight: '389px' }}>
          <span>
            <CircularProgress size={100} />
          </span>
        </Box>
      )}
    </Box>
  );
}
