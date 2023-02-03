const jwtMiddleware = require("../../../config/jwtMiddleware");
const editingProvider = require("../../app/Editing/editingProvider");
const editingService = require("../../app/Editing/editingService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 내 정보 수정
 * [PATCH] /mypages/:userId/user
 * path variable : userId
 * body : name, nickname, birth, education, address, introduce
 */
exports.patchUser = async function (req, res) {

    const userId = req.params.userId;

    const name = req.body.name;
    const nickname = req.body.nickname;
    const birth = req.body.birth;
    const education = req.body.education;
    const address = req.body.address;
    const introduce = req.body.introduce;

    if (!userId) return res.send(response(baseResponse.EDITING_USERID_EMPTY));
    if (!name) return res.send(response(baseResponse.EDITING_NAME_EMPTY));
    if (!nickname) return res.send(response(baseResponse.EDITING_NICKNAME_EMPTY));
    if (!birth) return res.send(response(baseResponse.EDITING_BIRTH_EMPTY));


    if (name.length > 7) return res.send(response(baseResponse.EDITING_NAME_LENGTH));
    if (nickname.length > 7) return res.send(response(baseResponse.EDITING_NICKNAME_LENGTH));
    if (education.length > 20) return res.send(response(baseResponse.EDITING_EDUCATION_LENGTH));
    if (address.length > 50) return res.send(response(baseResponse.EDITING_ADDRESS_LENGTH));
    if (introduce.length > 100) return res.send(response(baseResponse.EDITING_INTRODUCE_LENGTH));

    const updateUserResponse = await editingService.editUser(
        name,
        nickname,
        birth,
        education,
        address,
        introduce,
        userId,
    );

    return res.send(updateUserResponse);
};


/**
 * API No. 2
 * API Name : 내 정보 수정
 * [PATCH] /mypages/:userId/password
 * path variable : userId
 * body : password
 */
exports.patchPassword = async function (req, res) {

    const userId = req.params.userId;

    const password = req.body.password;
    const password2 = req.body.password2;

    if (!userId) return res.send(response(baseResponse.EDITING_USERID_EMPTY));
    if (!password) return res.send(response(baseResponse.EDITING_PASSWORD_EMPTY));
    // 비밀번호 재입력값 빈칸 오류
    if (!password2) return res.send(response(baseResponse.EDITING_PASSWORD_EMPTY));
    // 비밀번호 입력과 재입력값 비교
    if (password != password2) res.send(response(baseResponse.EDITING_PASSWORD_DIFFERENT));

    if (password.length > 20) return res.send(response(baseResponse.EDITING_PASSWORD_LENGTH));
    if (password2.length > 20) return res.send(response(baseResponse.EDITING_PASSWORD_LENGTH));


    const updatePasswordResponse = await editingService.editPassword(
        password,
        userId,
    );

    return res.send(updatePasswordResponse);
};