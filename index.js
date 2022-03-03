require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

// // config cors
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', `${process.env.REACT_PORT}`);
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(cors());
app.use(express.static('public'));

app.use(express.json({ extented: false }));

// Define Route
app.use("/", require("./routes/index"));
app.use("/api", require("./routes/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
