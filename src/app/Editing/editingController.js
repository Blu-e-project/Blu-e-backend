const jwtMiddleware = require("../../../config/jwtMiddleware");
const editingProvider = require("../../app/Report/editingProvider");
const editingService = require("../../app/Report/editingService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");