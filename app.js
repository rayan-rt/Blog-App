import dotenv from "dotenv";
import express from "express";
import { DBconnection } from "./utils/DBconnection.js";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";
import { authenticateCookie } from "./middlewares/authenticate.js";
import { router as staticRoute } from "./routes/staticRoute.js";
import { router as userRoute } from "./routes/userRoute.js";
import { router as blogRoute } from "./routes/blogRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// DB
DBconnection();

// file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authenticateCookie("JWT"));

app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
