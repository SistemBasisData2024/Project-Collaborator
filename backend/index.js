const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();

const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import routes
const routes = require('./routes/route');
app.use('/api', routes); // Menetapkan rute utama '/api' untuk semua rute di file route.js

app.listen(port, () => {
  console.log("Server is running and listening on port", port);
});
