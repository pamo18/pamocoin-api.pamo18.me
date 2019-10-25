/**
 * An Express server.
 */

"use strict";

const port = 8335;
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");

const index = require('./routes/index.js');
const auth = require('./routes/auth/auth.js');
const login = require('./routes/auth/login.js');
const register = require('./routes/auth/register.js');
const wallet = require('./routes/wallet.js');
const deposit = require('./routes/deposit.js');
const orders = require('./routes/orders.js');
const coins = require('./routes/coins.js');
const countries = require('./routes/countries.js');
const common = require('./routes/common.js');
const trade = require('./routes/trade.js');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use(cors()); //Cross-Origin Resource Sharing (CORS)

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", index);
app.use("/auth", auth);
app.use("/login", login);
app.use("/register", register);
app.use("/wallet", wallet);
app.use("/deposit", deposit);
app.use("/orders", orders);
app.use("/coins", coins);
app.use("/countries", countries);
app.use("/common", common);
app.use("/trade", trade);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server;
