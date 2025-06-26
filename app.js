const routes = require("./routes/index");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
// Initialize DB
require("./database");
// Initalize app
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
