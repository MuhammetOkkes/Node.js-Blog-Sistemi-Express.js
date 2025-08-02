const express = require("express");
const dotenv = require("dotenv");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");
const { StatusCodes } = require("http-status-codes");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/", blogRoutes);

app.use((req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
