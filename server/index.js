const express = require("express");

//express 
const app = express();
app.use(express.json());

//routes
app.use("/api", require("./routes/router"));

//run server
const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running at port: http://localhost:${PORT}`
  );
});