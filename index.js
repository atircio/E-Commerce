const express = require("express");
const app = express();
const connect = require("./src/database/connect");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();
connect();

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(8080, () => {
  console.log("Rodando");
});
