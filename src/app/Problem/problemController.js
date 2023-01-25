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

 //   const userIdFromJWT = req.verifiedToken.userId;
    const {subject, unit, problem, contents, image} = req.body;

    // 빈 값 체크
    if (!subject)
        return res.send(response(baseResponse.POSTPROBLEM_SUBJECT_EMPTY));
    if (!problem)
        return res.send(response(baseResponse.POSTPROBLEM_PROBLEM_EMPTY));
     if (!contents)
        return res.send(response(baseResponse.POSTPROBLEM_CONTENTS_EMPTY));

    // 길이 체크
    if (subject.length > 15)
        return res.send(response(baseResponse.POSTPROBLEM_SUBJECT_LENGTH));
    if (unit.length > 20)
        return res.send(response(baseResponse.POSTPROBLEM_UNIT_LENGTH));
    if (problem.length > 300)
        return res.send(response(baseResponse.POSTPROBLEM_PROBLEM_LENGTH));
    if (contents.length > 300)
        return res.send(response(baseResponse.POSTPROBLEM_CONTENTS_LENGTH)); 


    const postProblemResponse = await problemService.createProblem(
  //      userId,
        subject,
        unit,
        problem,
        contents,
        image
    );

    return res.send(postProblemResponse);
};

