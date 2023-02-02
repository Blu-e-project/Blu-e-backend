module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const editing = require('./editingController');

    // 내 정보 수정 API
    app.patch('/mypages/:userId/user', jwtMiddleware, editing.patchUser);
};