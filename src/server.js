import config from "./config/config";
import express from "express";
import morgan from "morgan";
import colors from "colors";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

import errorHandler from "./middleware/error";
import connectDB from "./config/db";

import authRouter from "./routes/auth.routes";
import bootcampRouter from "./routes/bootcamp.routes";
import courseRouter from "./routes/course.routes";

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(fileupload());
// Sanitize data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);
// Prevet http param pollution
app.use(hpp());
// Enable cors
app.use(cors());

app.use("/", express.static("public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bootcamps", bootcampRouter);
app.use("/api/v1/courses", courseRouter);

app.use(errorHandler);

const PORT = config.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${config.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
