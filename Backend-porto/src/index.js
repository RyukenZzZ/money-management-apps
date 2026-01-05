require("dotenv").config(); //to enable .env called
const express = require("express"); //import express to non-module
const fileUpload = require("express-fileupload"); //this package is for enable req.files
const router = require("./routes"); 
const {errorHandler, notFoundURLHandler} = require ("./middlewares/errors");

/* Make/initiate express application */
const app = express();
const port = process.env.PORT || 3000;

/* to activate body parser/reader (req.body) */
app.use(express.json());

/* to read form-body (body parser/reader) (req.files) if you want upload file */
app.use(
    fileUpload({
        limits: {fileSize: 50 * 1024 * 1024}, // 50MB
    })
)

/* all routes define here */
app.use("/",router);

/* This function is for 404 handle URL */
app.use(notFoundURLHandler);

/* THis function is to handle error when API hit, it always be the last middleware */
app.use(errorHandler);

/* Run the epress.js application */
app.listen(port, () => {
    console.log(`the express.js app is runing on port ${port}`);
})

