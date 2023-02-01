// 예시 파일
module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const report = require('./reportController');

    // Report 생성 API
    app.post('/service/reports/:userId/writing', jwtMiddleware, report.postreport);
};