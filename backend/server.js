require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const express = require('express');

const app = express();
const mongoose = require("mongoose")
const port = process.env.PORT || 3000;

const conectDB = require("./config/connectDB")
conectDB()

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/tasks", require("./routers/taskRouter"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});