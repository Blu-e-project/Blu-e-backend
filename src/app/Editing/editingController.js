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

    if (!userId) return res.send(response(baseResponse,EDITING_USERID_EMPTY));
    if (!name) return res.send(response(baseResponse,EDITING_NAME_EMPTY));
    if (!nickname) return res.send(response(baseResponse,EDITING_NICKNAME_EMPTY));
    if (!birth) return res.send(response(baseResponse,EDITING_BIRTH_EMPTY));


    if (name > 7) return res.send(response(baseResponse,EDITING_NAME_LENGTH));
    if (nickname > 7) return res.send(response(baseResponse,EDITING_NICKNAME_LENGTH));
    if (education > 20) return res.send(response(baseResponse,EDITING_EDUCATION_LENGTH));
    if (address > 50) return res.send(response(baseResponse,EDITING_ADDRESS_LENGTH));
    if (introduce > 100) return res.send(response(baseResponse,EDITING_INTRODUCE_LENGTH));

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