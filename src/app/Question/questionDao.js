// 모든 qusetion 조회
async function selectQuestion(connection,userId) {
    const selectQuestionListQuery = `
    select question.title, question.contents, answer.contents from
    answer right outer join question on answer.questionId = question.questionId where question.userId = ?;
                  `;
    const [questionRows] = await connection.query(selectQuestionListQuery,userId);
    return questionRows;
  }

// Question 생성
async function insertQuestionInfo(connection, insertQuestionInfoParams) {
  const insertQuestionInfoQuery = `
        INSERT INTO question(title, contents, createdAt, updatedAt, userId)
        VALUES (?, ?, now(), now(), ?);
    `;
  const insertQuestionInfoRow = await connection.query(
    insertQuestionInfoQuery,
    insertQuestionInfoParams,
  );

  return insertQuestionInfoRow;
}

// Question 삭제
async function deleteQuestion(connection, questionId) {
  const deleteQuestionQuery = `
                DELETE FROM question 
                WHERE questionId = ?;
                `;
  const deleteQuestionRows = await connection.query(deleteQuestionQuery, questionId);
  return deleteQuestionRows;
}


  module.exports = {
    selectQuestion,
    insertQuestionInfo,
    deleteQuestion,
 };