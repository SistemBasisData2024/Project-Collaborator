import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    // Validasi input
    if (!username || !password || !confirmPassword) {
      setError("Semua kolom harus diisi.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    // Handle register logic here, misalnya menggunakan fetch atau axios
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Registrasi gagal. Silakan coba lagi.");
      }
      // Registrasi sukses, redirect ke halaman login
      window.location.href = "/login";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 40,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Container maxWidth="xs">
        <Box p={3} bgcolor="#FFFFFF" boxShadow={2} borderRadius={8}>
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontFamily: "Roboto" }}>
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            {error && (
              <Typography variant="body1" color="error" align="center" gutterBottom sx={{ fontFamily: "Roboto" }}>
                {error}
              </Typography>
            )}
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ fontFamily: "Roboto" }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ fontFamily: "Roboto" }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ fontFamily: "Roboto" }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontFamily: "Roboto" }}>
              Register
            </Button>
          </form>
          <Typography variant="body1" align="center" mt={2} sx={{ fontFamily: "Roboto" }}>
            Already have an account?{" "}
            <MuiLink component={Link} to="/login" color="primary" underline="none">
              Login here
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
