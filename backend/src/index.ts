import express from "express";
import dotenv from "dotenv";
import db from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./routes/auth";
import userRouter from "./routes/userRoutes";
import gigRouter from "./routes/gigRoutes";
import bodyParser from "body-parser";
import { tokenVerifier } from "./middleware/tokenVerifier";
import skillsRouter from "./routes/skillRoutes";
import languagesRouter from "./routes/languagesRoutes";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(errorHandler);

app.use(express.json());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

const init = async (): Promise<void> => {
  try {
    await db.sync({ alter: true });

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

app.use("/auth", authRouter);

app.use(tokenVerifier);

app.use("/profiles", userRouter);

app.use("/gigs", gigRouter);

app.use("/skills", skillsRouter);

app.use("/languages", languagesRouter);

init();
