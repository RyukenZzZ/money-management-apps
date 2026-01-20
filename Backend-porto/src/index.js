import "dotenv/config";                 // pengganti require("dotenv").config()
import express from "express";
import fileUpload from "express-fileupload";

import router from "./routes/index.js";
import { errorHandler, notFoundURLHandler } from "./middlewares/errors.js";

/* Make/initiate express application */
const app = express();
const port = process.env.PORT || 3000;

/* to activate body parser/reader (req.body) */
app.use(express.json());

/* to read form-body (req.files) if you want upload file */
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  })
);

/* all routes define here */
app.use("/", router);

/* 404 handler */
app.use(notFoundURLHandler);

/* error handler (HARUS paling akhir) */
app.use(errorHandler);

/* Run the express.js application */
app.listen(port, () => {
  console.log(`the express.js app is running on port ${port}`);
});
