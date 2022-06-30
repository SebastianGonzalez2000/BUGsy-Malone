const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const bugs = require("./routes/modify_bugs");

const PORT = 3500;

app.use(logger);
app.use(cors());
app.use(express.json());

app.use("/bugs", bugs);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
