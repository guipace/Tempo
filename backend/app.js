// Imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';

// Setup express app
const app = express();

// Setup use of middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
if (!isProduction) {
    //Enable cors only in development environment
    app.use(cors());
};
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        }
    })
)
app.use(routes);

module.exports = app;
