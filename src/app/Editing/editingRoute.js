module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const editing = require('./editingController');

    // 내 정보 수정 API
    app.patch('/mypages/user', jwtMiddleware, editing.patchUser);
    
    // 비밀번호 수정 API
    app.patch('/mypages/password', jwtMiddleware, editing.patchPassword);

    // 이미지 정보 수정 API
    app.patch('/mypages/user/image', jwtMiddleware, editing.patchImage);
};