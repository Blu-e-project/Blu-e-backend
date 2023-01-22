// 모든 qusetion 조회
async function selectQuestion(connection,userId) {
    const selectQuestionListQuery = `
                  SELECT title 
                  FROM question
                  WHERE userId = ?;
                  `;
    const [questionRows] = await connection.query(selectQuestionListQuery,userId);
    return questionRows;
  }

  module.exports = {
    selectQuestion,
  };
  