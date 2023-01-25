const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');

module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    
    // 도메인을 추가할 경우 이곳에 Route를 추가
    require('../src/app/User/userRoute')(app);
    require('../src/app/Problem/problemRoute')(app);

    return app;
};