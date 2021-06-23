const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const userRouter = require("./routes/userRouter");
const verifyRouter = require("./routes/verifyRouter");

app.use("/api/users", userRouter);

app.use("/verify", verifyRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
