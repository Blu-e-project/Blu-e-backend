const jwtMiddleware = require("../../../config/jwtMiddleware");
const problemProvider = require("../../app/Problem/problemProvider");
const problemService = require("../../app/Problem/problemService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 1
 * API Name : 궁금한 문제 작성 API
 * [POST] /problems
 */
exports.postProblems = async function (req, res) {

    /**
     * Body: subject, unit, problem, contents, image
     */

    const userId = req.verifiedToken.userId;
    const {subject, unit, problem, contents, image} = req.body;

    // 빈 값 체크
    if (!subject){
        return res.send(errResponse(baseResponse.POSTPROBLEM_SUBJECT_EMPTY));
    } else if (!problem) {
        return res.send(errResponse(baseResponse.POSTPROBLEM_PROBLEM_EMPTY));
    } else if (!contents) {
        return res.send(errResponse(baseResponse.POSTPROBLEM_CONTENTS_EMPTY));
    }
    
    // 길이 체크
    if (subject.length > 15){
        return res.send(errResponse(baseResponse.POSTPROBLEM_SUBJECT_LENGTH));
    } else if (unit){
        if(unit.length > 20)
        return res.send(errResponse(baseResponse.POSTPROBLEM_UNIT_LENGTH));
    } else if (problem.length > 300){
        return res.send(errResponse(baseResponse.POSTPROBLEM_PROBLEM_LENGTH));
    } else if (contents.length > 300) {
        return res.send(errResponse(baseResponse.POSTPROBLEM_CONTENTS_LENGTH)); 
    }

    const postProblemResponse = await problemService.createProblem(
        userId,
        subject,
        unit,
        problem,
        contents,
        image
    );

    return res.send(postProblemResponse);
};


/**
 * API No. 2
 * API Name : 궁금한 문제 조회 API 
 * [GET] /problems
 */
exports.getProblems = async function (req, res) {

    // 문제 전체 조회
    const problemListResult = await problemProvider.retrieveProblemList();
    return res.send(response(baseResponse.SUCCESS, problemListResult));

};


/**
 * API No. 3
 * API Name : 특정 문제 조회 API
 * [GET] /problems/:problemId
 */
exports.getProblemById = async function (req, res) {

    /**
     * Path Variable: problemId
     */
    const problemId = req.params.problemId;
    // 빈 값 체크
    if (!problemId) return res.send(errResponse(baseResponse.PROBLEM_PROBLEMID_EMPTY));

    const problemByProblemId = await problemProvider.retrieveProblem(problemId);
    return res.send(response(baseResponse.SUCCESS, problemByProblemId));
};

/**
 * API No. 4
 * API Name : 내가 질문한 문제 조회 API
 * [GET] /problemByMe
 */
exports.getProblemByMe = async function (req, res) {


    const userId = req.verifiedToken.userId;
    // 빈 값 체크
    if (!userId) return res.send(errResponse(baseResponse.PROBLEM_USERID_EMPTY));

    const problemByMe = await problemProvider.retrieveMyProblemList(userId);
    return res.send(response(baseResponse.SUCCESS, problemByMe));
};

/**
 * API No. 5
 * API Name : 특정 문제 삭제 API
 * [DELETE] /problems/:problemId
 */

exports.deleteProblems = async function(req, res) {
    /**
     * Path Variable: problemId
     */

    const problemId = req.params.problemId;
    // 빈 값 체크
    if (!problemId) return res.send(errResponse(baseResponse.PROBLEM_PROBLEMID_EMPTY));

    const deleteProblemResponse = await problemService.deleteProblem(problemId);
    return res.send(deleteProblemResponse);
};

/**
 * API No. 6
 * API Name : 답변 작성 API
 * [POST] /problems/:problemId/solutions
 */
exports.postSolutions = async function (req, res) {
    /**
     * Body:contents
     * Path Variable: problemId
     */
    const userId = req.verifiedToken.userId;
    const {contents} = req.body;
    const problemId = req.params.problemId;
    // 빈 값 체크
    if (!problemId) return res.send(errResponse(baseResponse.PROBLEM_PROBLEMID_EMPTY));
    if (!contents)
        return res.send(errResponse(baseResponse.POSTSOLUTION_CONTENTS_EMPTY));
    // 길이 체크
    if (contents.length > 300)
        return res.send(errResponse(baseResponse.POSTSOLUTION_CONTENTS_LENGTH)); 


    const postSolutionResponse = await problemService.createSolution(
        userId,
        problemId,
        contents
    );
    return res.send(postSolutionResponse);
};

/**
 * API No. 7
 * API Name : 답변 조회 API 
 * [GET] /problems/:problemId/solutions
 */
exports.getSolutions = async function (req, res) {
    /**
     * Path Variable: problemId
     */
    const problemId = req.params.problemId;
    //빈 값 체크
    if (!problemId) return res.send(errResponse(baseResponse.PROBLEM_PROBLEMID_EMPTY));

    const solutionListResult = await problemProvider.retrieveSolutionList(problemId);
    return res.send(response(baseResponse.SUCCESS, solutionListResult));

};

/**
 * API No. 8
 * API Name : 내가 답변한 질문글 조회 API
 * [GET] /problemSolByMe
 */
exports.getProblemSolByMe = async function (req, res) {

    const userId = req.verifiedToken.userId;
    //빈 값 체크
    // if (!userId) return res.send(errResponse());

    const problemSolByMeListResult = await problemProvider.retrieveProblemSolByMeList(userId);
    return res.send(response(baseResponse.SUCCESS, problemSolByMeListResult));

};

/**
 * API No. 9
 * API Name : 답변 수정 API 
 * [PATCH] /problems/:problemId/solutions/:solutionId
 */
exports.patchSolutions = async function (req, res) {
    /**
     * Body:contents
     * Path Variable: problemId, solutionId
     */
    const {contents} = req.body;
    const problemId = req.params.problemId;
    const solutionId = req.params.solutionId;
    // 빈 값 체크
    if (!problemId) return res.send(errResponse(baseResponse.PROBLEM_PROBLEMID_EMPTY));
    if (!solutionId) return res.send(errResponse(baseResponse.PROBLEM_SOLUTIONID_EMPTY));
    if (!contents)
        return res.send(errResponse(baseResponse.POSTSOLUTION_CONTENTS_EMPTY));
    // 길이 체크
    if (contents.length > 300)
        return res.send(errResponse(baseResponse.POSTSOLUTION_CONTENTS_LENGTH)); 
    
    const updateSolutionResponse = await problemService.updateSolution(
        contents,
        problemId,
        solutionId
    );
    return res.send(updateSolutionResponse);

};

/**
 * API No. 10
 * API Name : 답변 삭제 API
 * [DELETE] /problems/:problemId/solutions/:solutionId
 */

exports.deleteSolutions = async function(req, res) {
    /**
     * Path Variable: problemId, solutionId
     */
    const problemId = req.params.problemId;
    const solutionId = req.params.solutionId;
    // 빈 값 체크
    if (!problemId) return res.send(errResponse(baseResponse.PROBLEM_PROBLEMID_EMPTY));
    if (!solutionId) return res.send(errResponse(baseResponse.PROBLEM_SOLUTIONID_EMPTY));

    const deleteSolutionResponse = await problemService.deleteSolution(
        problemId,
        solutionId
    );
    return res.send(deleteSolutionResponse);
};