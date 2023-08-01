const express = require("express");
const cors = require("cors");

//express 
const app = express();
app.use(express.json());

app.use(cors());

//routes
app.use("/", require("./routes/router"));

//run server
const PORT = process.env.PORT  || 3000;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running at port: http://localhost:${PORT}`
  );
});