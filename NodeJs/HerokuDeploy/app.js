'use strict'
const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    path = require('path'),
    favicon = require('serve-favicon'),
    viewsURL=path.join(__dirname,'views'),
    logoURL = `${__dirname}/public/img/logoCompleto.png`,
    publicDir = express.static(path.join(__dirname, "public")),
    routeIndex = require('./routes/index'),
    PORT = process.env.PORT || 3000;

app.set('views',viewsURL)
    .set('view engine','pug')
    .set('port',PORT)
    .use(morgan('dev'))
    .use(favicon(logoURL))
    .use(publicDir)
    .use('/',routeIndex)


module.exports = app