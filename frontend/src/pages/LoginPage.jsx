import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    // Validasi input
    if (!username || !password) {
      setError("Username dan password harus diisi.");
      return;
    }
    // Handle login logic here, misalnya menggunakan fetch atau axios
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Login gagal. Silakan coba lagi.");
      }
      // Login sukses, redirect ke halaman selanjutnya
      window.location.href = "/dashboard";
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Container maxWidth="xs">
        <Box p={3} bgcolor="#FFFFFF" boxShadow={2} borderRadius={8}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            {error && (
              <Typography variant="body1" color="error" align="center" gutterBottom>
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
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body1" align="center" mt={2}>
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/register"
              color={isRegisterClicked ? "text.primary" : "primary"} // Memilih warna teks berdasarkan apakah tombol register ditekan atau tidak
              underline="none"
              sx={{
                "&:hover": {
                  color: "text.secondary", // Mengubah warna saat hover
                },
              }}
              onClick={() => setIsRegisterClicked(true)}
            >
              Register here
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
