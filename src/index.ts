import express from "express";
import bodyParser from "body-parser";
import userRouter from './routes/user.route'
import cors from 'cors'
import postRouter from "./routes/post.route";
import uploadRouter from "./routes/upload.route";

const app = express();
app.use(cors())


app.use(bodyParser.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/upload", uploadRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


