import express from "express";
import bodyParser from "body-parser";
import userRouter from './routes/user.route'

const app = express();


app.use(bodyParser.json());
app.use("/api/v1/user", userRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
