
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
                SELECT userId, subject, unit, problem, contents, image 
                FROM Problem ORDER BY problemId DESC;
                `;
  const [problemRows] = await connection.query(selectProblemListQuery);
  return problemRows;
}


// problemId로 문제 조회
async function selectProblemId(connection, problemId) {
  const selectProblemIdQuery = `
                 SELECT userId, subject, unit, problem, contents, image 
                 FROM Problem
                 WHERE problemId = ?;
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
  
  module.exports = {
    insertProblem,
    selectProblem,
    selectProblemId,
    deleteProblem
  };
  