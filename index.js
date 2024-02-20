import express from "express";
import cors from "cors";
import userRoute from "./Routes/userRoute.js";
import productRoute from "./Routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

app.use(userRoute);
app.use(productRoute);
app.use(
  "/assets/uploads",
  express.static(path.join(__dirname + "/assets/uploads"))
);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
