const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const router = require("./router/router");
// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(router);

app.listen(port, () => console.log("listening on port", port));
