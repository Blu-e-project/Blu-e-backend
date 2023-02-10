
  // 문제 생성
  async function insertProblem(connection, insertProblemParams) {
    const insertProblemQuery = `
          INSERT INTO problem(userId, subject, unit, problem, contents, image)
          VALUES (?, ?, ?, ?, ?, ?);
      `;
    const insertProblemRow = await connection.query(
      insertProblemQuery,
      insertProblemParams
    );
  
    return insertProblemRow;
  }
  
  // 전체 문제 조회(최신순)
async function selectProblem(connection) {
  const selectProblemListQuery = `
                  SELECT p.userId, p.problemId, u.nickname, p.subject, p.unit, p.problem, p.contents, p.image
                  FROM problem p, user u
                  WHERE p.userId=u.userId
                  ORDER BY problemId DESC;
                `;
  const [problemRows] = await connection.query(selectProblemListQuery);
  return problemRows;
}


// problemId로 문제 조회
async function selectProblemId(connection, problemId) {
  const selectProblemIdQuery = `
                 SELECT p.userId, p.problemId, u.userImg, u.nickname, p.subject, p.unit, p.problem, p.contents, p.image, date_format(p.createdAt, '%Y.%m.%d') as createdAt, date_format(p.updatedAt, '%Y.%m.%d') as updatedAt
                 FROM user u, problem p 
                 WHERE u.userId=p.userId and problemId = ?;
                 `;
  const [problemRow] = await connection.query(selectProblemIdQuery, problemId);
  return problemRow;
}

// 내가 질문한 문제 목록 조회
async function selectProblemByUserId(connection, userId) {
  const selectProblemIdQuery = `
                 SELECT problemId, nickname, subject, unit, problem, contents, image
                 FROM user u, problem p 
                 WHERE u.userId=p.userId and p.userId = ?;
                 `;
  const [problemRow] = await connection.query(selectProblemIdQuery, userId);
  return problemRow;
}

//문제 삭제
async function deleteProblem(connection, problemId) {
  const deleteProblemQuery = `
                DELETE FROM problem 
                WHERE problemId = ?;
                `;
  const deleteProblemRows = await connection.query(deleteProblemQuery, problemId);
  return deleteProblemRows;
}

// 답변 생성
  async function insertSolution(connection, insertSolutionParams) {
    const insertSolutionQuery = `
          INSERT INTO solution(userId, problemId, contents)
          VALUES (?, ?, ?);
      `;
    const insertSolutionRow = await connection.query(
      insertSolutionQuery,
      insertSolutionParams
    );
  
    return insertSolutionRow;
}

  // 답변 조회
  async function selectSolution(connection, problemId) {

    const selectSolutionListQuery = `
                        SELECT solutionId, problemId, userId, userImg, nickname, contents, date_format(solution.updatedAt, '%Y.%m.%d') as updatedAt
                        FROM solution
                        JOIN user ON solution.userId=user.userId and problemId = ?;
                        `
    const [solutionRows] = await connection.query(selectSolutionListQuery, problemId);
    return solutionRows;
  }

    // 내가 답변한 질문글 조회
    async function selectProblemSolByMe(connection, userId) {

      const selectProSolutionListQuery = `
                          SELECT problemId, (select nickname from user where userId = problem.userId) as nickname, subject, unit, problem, contents, image
                          FROM problem
                          WHERE problemId in (select problemId from solution where userId = ?);
                          `
      const [solutionRows] = await connection.query(selectProSolutionListQuery, userId);
      return solutionRows;
    }

  // 답변 수정
  async function updateSolution(connection, updateSolutionParams) {

    const updateSolutionQuery = `
                        UPDATE solution
                        SET contents = ?
                        WHERE problemId =? and solutionId = ?;
                        `;

    const updateSolutionRow = await connection.query(
      updateSolutionQuery,
      updateSolutionParams
    );
    return updateSolutionRow;
}

  //답변 삭제
async function deleteSolution(connection, deleteSolutionparams) {
  const deleteSolutionQuery = `
                DELETE FROM solution 
                WHERE problemId =? and solutionId = ?;
                `;
  const deleteSolutionRows = await connection.query(
    deleteSolutionQuery,
    deleteSolutionparams
  );
  return deleteSolutionRows;
}

  // 문제 부분 조회(최신 5개)
  async function selectProblemMain(connection) {
    const selectProblemMainListQuery = `
                    SELECT userId, problemId, nickname, subject, unit, problem, contents, image
                    FROM problem
                    JOIN user ON problem.userId=user.userId
                    ORDER BY problemId DESC
                    LIMIT 5
                  `;
    const [problemMainRows] = await connection.query(selectProblemMainListQuery);
    return problemMainRows;
  }

  
  module.exports = {
    insertProblem,
    selectProblem,
    selectProblemId,
    selectProblemByUserId,
    deleteProblem,
    insertSolution,
    selectSolution,
    selectProblemSolByMe,
    updateSolution,
    deleteSolution,
    selectProblemMain
  };
  