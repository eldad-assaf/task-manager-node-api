require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const connectDB = require("./db/connect");

//authenticate user 
const authenticateUser = require('./middleware/authentication');

//routers
const tasksRouter = require("./routes/tasks");
const authRouter = require('./routes/auth')



//middleware
app.use(express.static("./public"));
app.use(express.json());



//error handler
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");




//routes
//app.use("/api/v1/tasks", authenticateUser,tasksRouter);
app.use("/api/v1/tasks",authenticateUser,tasksRouter);

app.use("/api/v1/auth" ,authRouter);
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
