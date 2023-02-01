
  // 문제 생성
  async function insertProblem(connection, insertProblemParams) {
    const insertProblemQuery = `
          INSERT INTO Problem(userId, subject, unit, problem, contents, image)
          VALUES (?, ?, ?, ?, ?, ?);
      `;
    const insertProblemRow = await connection.query(
      insertProblemQuery,
      insertProblemParams
    );
  
    return insertProblemRow;
  }
  
  // 전체 문제 조회
async function selectProblem(connection) {
  const selectProblemListQuery = `
                  SELECT problemId, nickname, subject, unit, problem, contents, image 
                  FROM problem 
                  JOIN user ON problem.userId=user.userId;
                `;
  const [problemRows] = await connection.query(selectProblemListQuery);
  return problemRows;
}


// problemId로 문제 조회
async function selectProblemId(connection, problemId) {
  const selectProblemIdQuery = `
                 SELECT nickname, subject, unit, problem, contents, image 
                 FROM user u, problem p 
                 WHERE u.userId=p.userId and problemId = ?;
                 `;
  const [problemRow] = await connection.query(selectProblemIdQuery, problemId);
  return problemRow;
}

//문제 삭제
async function deleteProblem(connection, problemId) {
  const deleteProblemQuery = `
                DELETE FROM Problem 
                WHERE problemId = ?;
                `;
  const deleteProblemRows = await connection.query(deleteProblemQuery, problemId);
  return deleteProblemRows;
}

// 답변 생성
  async function insertSolution(connection, insertSolutionParams) {
    const insertSolutionQuery = `
          INSERT INTO Solution(userId, problemId, contents)
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
                        SELECT solutionId, problemId, nickname, contents
                        FROM solution
                        JOIN user ON solution.userId=user.userId and problemId = ?;
                        `
    const [solutionRows] = await connection.query(selectSolutionListQuery, problemId);
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
  
  module.exports = {
    insertProblem,
    selectProblem,
    selectProblemId,
    deleteProblem,
    insertSolution,
    selectSolution,
    updateSolution,
    deleteSolution
  };
  