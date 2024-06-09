const express = require("express");
const cors = require("cors");
const pool = require('./config/database');
require("dotenv").config();


const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import routes
const ApplicationRoutes = require('./routes/application.routes');
const ProjectRoutes = require('./routes/project.routes');
const RatingRoutes = require('./routes/rating.routes');
const UserRoutes = require('./routes/user.routes');

// Use routes
app.use('/applications', ApplicationRoutes);
app.use('/projects', ProjectRoutes);
app.use('/ratings', RatingRoutes);
app.use('/users', UserRoutes);

pool.connect().then(() => {
    console.log('Connected to the NeonDB');
}).catch(error => {
    console.error('Connection error', error);
});

app.listen(port, () => {
  console.log("Server is running and listening on port", port);
});
