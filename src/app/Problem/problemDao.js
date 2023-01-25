
  // 문제 생성
  async function insertProblem(connection, insertProblemParams) {
    const insertProblemQuery = `
          INSERT INTO Problem(userId, subject, unit, problem, contents, image)
          VALUES (1, ?, ?, ?, ?, ?);
      `;
    const insertProblemRow = await connection.query(
      insertProblemQuery,
      insertProblemParams
    );
  
    return insertProblemRow;
  }
  
  
  module.exports = {
    insertProblem
  };
  