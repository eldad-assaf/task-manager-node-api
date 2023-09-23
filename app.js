const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const tasks = require("./routes/tasks");
const auth = require('./routes/auth')
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/auth", auth);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port} ... `));
  } catch (error) {
    console.log(error);
  }
};

start();
