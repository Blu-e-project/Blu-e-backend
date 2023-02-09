const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const mentoringProvider = require("./mentoringProvider");
const mentoringDao = require("./mentoringDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// const jwt = require("jsonwebtoken");


// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createProblem = async function (userId, subject, unit, problem, contents, image) {
    try {

        const insertProblemParams = [userId, subject, unit, problem, contents, image];

        const connection = await pool.getConnection(async (conn) => conn);

        const problemIdResult = await problemDao.insertProblem(connection, insertProblemParams);
        console.log(`추가된 문제 : ${problemIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createProblem Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteProblem = async function(problemId){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const problemIdResult = await problemDao.deleteProblem(connection, problemId);
        console.log(`삭제된 문제 : ${problemIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteProblem Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createPickMentors = async function (userId, title, contents, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender) {
    try {

        const roleRows = await mentoringProvider.roleCheck(userId);

        const role = roleRows[0].role
        if(role!==2){
            return errResponse(baseResponse.MENTORMENTEE_AUTH);
        }

        const insertPickMentorsParams = [userId, title, contents, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender];

        const connection = await pool.getConnection(async (conn) => conn);

        const pickIdResult = await mentoringDao.insertPickMentors(connection, insertPickMentorsParams);
        console.log(`추가된 구인글 : ${pickIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPick Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.createPickMentees = async function (userId, title, contents, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender) {
    try {

        const roleRows = await mentoringProvider.roleCheck(userId);

        const role = roleRows[0].role
        if(role!==1){
            return errResponse(baseResponse.MENTORMENTEE_AUTH);
        }

        const insertPickMenteesParams = [userId, title, contents, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender];

        const connection = await pool.getConnection(async (conn) => conn);

        const pickIdResult = await mentoringDao.insertPickMentees(connection, insertPickMenteesParams);
        console.log(`추가된 구인글 : ${pickIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPick Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updatePickMentor = async function (pickId, title, contents, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender) {
    try {

        const updatePickMentorsParams = [title, contents, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender, pickId];

        const connection = await pool.getConnection(async (conn) => conn);

        const pickIdResult = await mentoringDao.updatePickMentors(connection, updatePickMentorsParams);
        console.log(`수정된 구인글 : ${pickIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - updatePick Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deletePickMentor = async function(pickId, userId){
    try {
        const roleRows = await mentoringProvider.pickUserCheck(pickId);
        const userIdCheck = roleRows[0].userId
        if(userId!==userIdCheck){
            return errResponse(baseResponse.MENTORMENTEE_AUTH);
        }
        const matchingCheck = await mentoringProvider.pickMatchingCheck(pickId);
        if(matchingCheck===1){
            return errResponse(baseResponse.MATCHING_AUTH);
        }


        const connection = await pool.getConnection(async (conn) => conn);
        const pickMentorIdResult = await mentoringDao.deletePickMentor(connection, pickId);
        console.log(`삭제된 구인글 : ${pickMentorIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deletePickService error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.deletePickMentee = async function(pickId, userId){
    try {
        const roleRows = await mentoringProvider.pickUserCheck(pickId);
        const userIdCheck = roleRows[0].userId
        if(userId!==userIdCheck){
            return errResponse(baseResponse.MENTORMENTEE_AUTH);
        }
        const matchingCheck = await mentoringProvider.pickMatchingCheck(pickId);
        if(matchingCheck===1){
            return errResponse(baseResponse.MATCHING_AUTH);
        }



        const connection = await pool.getConnection(async (conn) => conn);
        const pickMenteeIdResult = await mentoringDao.deletePickMentee(connection, pickId);
        console.log(`삭제된 구인글 : ${pickMenteeIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deletePickService error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createMentorsCom = async function (userId, pickId, contents){
    try {
        // 댓글은 한 번만 쓸 수 있도록 함
        const pickComCheckParams = [userId, pickId]
        const pickComRows = await mentoringProvider.pickComCheckByUserId(pickComCheckParams);
        if (pickComRows.length>0)
            return response(baseResponse.PICKCOMMENT_COMMENT_REDUNDANT);

        const roleRows = await mentoringProvider.roleCheck(userId);

        console.log(roleRows[0], roleRows[0].role)
        const role = roleRows[0].role

        if (role === 2) // 멘토 구인글의 댓글 작성자 역할이 멘티이면 안됨
            return response(baseResponse.PICKCOMMENT_ROLE_WRONG);

        const insertMentorsComParams = [userId, pickId, role, contents];

        const connection = await pool.getConnection(async (conn) => conn);
        const mentorComIdResult = await mentoringDao.insertMentorsCom(connection,insertMentorsComParams);
        //console.log(`추가된 댓글 : ${mentorComIdResult[0]}`)
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch(err){
        logger.error(`App - createMentorComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

exports.updateMentorsCom= async function(contents, pickId, pickCommentId){
    try{
        const updateMentorsComParams = [contents, pickId, pickCommentId]
        const connection = await pool.getConnection(async (conn) => conn);
        const mentorComIdResult = await mentoringDao.updateMentorsCom(connection,updateMentorsComParams);
        console.log(`수정된 댓글 : ${mentorComIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err){
        logger.error(`App - updateComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteMentorsCom = async function(pickId, pickCommentId){
    try{
        const deleteMentorsComParams = [pickId, pickCommentId]
        const connection = await pool.getConnection(async (conn) => conn);
        const mentorComIdResult = await mentoringDao.deleteMentorsCom(connection,deleteMentorsComParams);
        console.log(`삭제된 댓글 : ${mentorComIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - deleteComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.updateMenteesCom= async function(contents, pickId, pickCommentId){
    try{
        const updateMentorsComParams = [contents, pickId, pickCommentId]
        const connection = await pool.getConnection(async (conn) => conn);
        const mentorComIdResult = await mentoringDao.updateMenteesCom(connection,updateMentorsComParams);
        console.log(`수정된 댓글 : ${mentorComIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err){
        logger.error(`App - updateComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteMenteesCom = async function(pickId, pickCommentId){
    try{
        const deleteMentorsComParams = [pickId, pickCommentId]
        const connection = await pool.getConnection(async (conn) => conn);
        const mentorComIdResult = await mentoringDao.deleteMenteesCom(connection,deleteMentorsComParams);
        console.log(`삭제된 댓글 : ${mentorComIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - deleteComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.patchPickMentors = async function(pickId, userId, title, contents, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender){
    try {
        console.log(pickId,  userId);
        const roleRows = await mentoringProvider.pickUserCheck(pickId, userId);
        console.log(roleRows);
        const userIdCheck = roleRows[0].userId
        if(userId!==userIdCheck){
            return errResponse(baseResponse.MENTORMENTEE_AUTH);
        }

        const patchPickMentorsParams = [title, contents, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender, pickId];
        const connection = await pool.getConnection(async (conn) => conn);
        const patchPickMentorIdResult = await mentoringDao.updatePickMentors(connection, patchPickMentorsParams);
        console.log(`수정된 구인글 : ${patchPickMentorIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - patchPickService error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.patchPickMentees = async function(pickId, userId, title, contents, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender){
    try {
        const roleRows = await mentoringProvider.pickUserCheck(pickId, userId);
        const userIdCheck = roleRows[0].userId
        if(userId!==userIdCheck){
            return errResponse(baseResponse.MENTORMENTEE_AUTH);
        }

        const patchPickMenteesParams = [title, contents, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender, pickId];
        const connection = await pool.getConnection(async (conn) => conn);
        const patchPickMenteeIdResult = await mentoringDao.updatePickMentees(connection, patchPickMenteesParams);
        console.log(`수정된 구인글 : ${patchPickMenteeIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - patchPickService error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createMenteesCom = async function (userId, pickId, contents){
    try {
        // 댓글은 한 번만 쓸 수 있도록 함
        const pickComCheckParams = [userId, pickId]
        const pickComRows = await mentoringProvider.pickComCheckByUserId(pickComCheckParams);
        if (pickComRows.length>0)
            return response(baseResponse.PICKCOMMENT_COMMENT_REDUNDANT);

        const roleRows = await mentoringProvider.roleCheck(userId);

        console.log(roleRows[0], roleRows[0].role)
        const role = roleRows[0].role
        
        if (role === 1) // 멘티 구인글의 댓글 작성자 역할이 멘토이면 안됨
            return response(baseResponse.PICKCOMMENT_ROLE_WRONG);
        const insertMenteesComParams = [userId, pickId, role, contents];

        const connection = await pool.getConnection(async (conn) => conn);
        const menteeComIdResult = await mentoringDao.insertMenteesCom(connection,insertMenteesComParams);
        console.log(`추가된 댓글 : ${menteeComIdResult[0]}`)
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch(err){
        logger.error(`App - createMenteeComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}
exports.createMatching = async function (userId, pickId, pickCommentId){
    try {
        // userId가 해당 구인글 userId와 동일한지 확인
        const roleRows = await mentoringProvider.pickUserCheck(pickId, userId);
        const userIdCheck = roleRows[0].userId
        if(userId!==userIdCheck){
            return errResponse(baseResponse.MENTORMENTEE_AUTH);
        }
        // const pickUserId = await mentoringDao.getPickUserId(pickId);
        const connection = await pool.getConnection(async (conn) => conn);

        // matching 테이블에 추가
        const insertMatchingResult = await mentoringDao.insertMatching(connection, userId, pickId, pickCommentId);
        console.log(`추가된 매칭 : ${insertMatchingResult[0]}`)

        // 매칭 완료이므로, pick 테이블 status는 0으로 업데이트
        const statusZero = await mentoringDao.updateStatus(connection, pickId);
        console.log(`업데이트 된 pick의 status: ${statusZero}`)
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch(err){
        logger.error(`App - createMatching Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
