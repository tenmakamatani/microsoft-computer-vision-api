"use strict";

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT | 80;

// use helmet
const helmet = require("helmet");
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// util settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res, next) => {
    res.render("index");
});

// router setting
const fileUploadRouter = require("./routes/fileUpload");
app.use("/fileUpload", fileUploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log("Listening on " + PORT + "...");
});