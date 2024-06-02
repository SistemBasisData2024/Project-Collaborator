import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import CollaborationSVG from "../assets/collaboration.svg";
import Person1Img from "../assets/person1.jpg";
import Person2Img from "../assets/person2.jpg";
import Person3Img from "../assets/person3.jpg";

const LandingPage = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hoveredMember, setHoveredMember] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMemberHover = (member) => {
    setHoveredMember(member);
  };

  const buttonStyle = {
    mt: 4,
    borderRadius: 50,
    padding: "12px 40px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
    "&:hover": { background: "#ff6347" }
  };

  const cardStyle = {
    maxWidth: 345,
    cursor: "pointer",
    textAlign: "center",
    transition: "transform 0.3s ease",
    "&:hover": { transform: "scale(1.05)" }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ffa07a, #ff6347)",
        margin: 0,
        padding: 0,
        color: "#24292e",
        fontFamily: "Montserrat, sans-serif",
        textAlign: "center",
      }}
    >
      <Container maxWidth="xl">
        {/* Upper Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: windowHeight,
          }}
        >
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box textAlign="center">
                <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold", letterSpacing: 1.5 }}>
                  Welcome to ProjectPals
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
                  ProjectPals is a platform designed to help individuals and organizations find and collaborate with potential project partners.
                </Typography>
                <Button variant="contained" color="secondary" sx={buttonStyle} component={Link} to="/login">
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img src={CollaborationSVG} alt="Collaboration" width="80%" height="auto" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Lower Section */}
        <Box
          sx={{
            padding: "50px 0",
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" mb={4}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Card
                  sx={cardStyle}
                  onMouseEnter={() => handleMemberHover("Azriel Dimas A")}
                  onMouseLeave={() => handleMemberHover(null)}
                >
                  <CardMedia component="img" height="300" image={Person1Img} alt="Person 1" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                      Azriel Dimas A
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={4}>
                      Teknik Komputer'22
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Card
                  sx={cardStyle}
                  onMouseEnter={() => handleMemberHover("Fathia Zulfa A")}
                  onMouseLeave={() => handleMemberHover(null)}
                >
                  <CardMedia component="img" height="300" image={Person2Img} alt="Person 2" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                      Fathia Zulfa A
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={4}>
                      Teknik Komputer'22
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Card
                  sx={cardStyle}
                  onMouseEnter={() => handleMemberHover("Nicholas Samosir")}
                  onMouseLeave={() => handleMemberHover(null)}
                >
                  <CardMedia component="img" height="300" image={Person3Img} alt="Person 3" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                      Nicholas Samosir
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={4}>
                      Teknik Komputer'22
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
