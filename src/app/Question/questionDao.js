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
        INSERT INTO question(title, contents, createdAt, updateAt,userId)
        VALUES (?, ?, now(), now(), ?);
    `;
  const insertQuestionInfoRow = await connection.query(
    insertQuestionInfoQuery,
    insertQuestionInfoParams,
  );

  return insertQuestionInfoRow;
}

// Question 수정
async function updateQuestionInfo(connection, updateQuestionInfoParams) {
  const updateQuestionQuery = `
  UPDATE question 
  SET title = ?, contents = ?, updateAt = now()
  WHERE (userId = ? and questionId = ?);`;

  const updateQuestionRow = await connection.query(updateQuestionQuery, updateQuestionInfoParams);
  return updateQuestionRow;
}


// 모든 qusetion 조회
async function selectQuestionNeedingAnswer(connection) {
    const selectQuestionNeedingAnswerListQuery = `
                  SELECT title, contents 
                  FROM question;
                  `;
    const [questionRows] = await connection.query(selectQuestionNeedingAnswerListQuery);
    return questionRows;
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
    updateQuestionInfo,
    selectQuestionNeedingAnswer,
    deleteQuestion,
 };
  
  