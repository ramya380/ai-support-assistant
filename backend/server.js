require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

require("./db");

const chatRoute = require("./routes/chat");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30
  })
);

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));