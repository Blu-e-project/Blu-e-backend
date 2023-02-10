// 모든 qusetion 조회
async function selectQuestion(connection,userId) {
    const selectQuestionListQuery = `
    select question.questionId, question.userId, question.title, question.contents, answer.contents as answer from
    answer right outer join question on answer.questionId = question.questionId where question.userId = ?;
                  `;
    const [questionRows] = await connection.query(selectQuestionListQuery,userId);
    return questionRows;
  }

// 특정 Q&A 조회
async function selectQuestionByQuestionId(connection, userId, questionId) {
  const selectQuestionQuery = `
  select question.title, question.contents, answer.contents as answer from
  answer right outer join question on answer.questionId = question.questionId where question.userId = ${userId} and question.questionId = ${questionId};
                `;
  const [questionRows] = await connection.query(selectQuestionQuery, userId, questionId);
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


// 답변 기본 값으로, [답변 대기 중] 메시지가 출력되게 함
async function insertDefaultAnswerInfo(connection, userId) {
  const insertDefaultAnswerQuery = `
                insert into answer(questionId, userId, contents)
                values((SELECT questionId FROM question ORDER BY questionId DESC LIMIT 1),${userId},'[답변 대기 중]');
                `;
  const insertDefaultAnswerRows = await connection.query(insertDefaultAnswerQuery);
  return insertDefaultAnswerRows;
}


  module.exports = {
    selectQuestion,
    selectQuestionByQuestionId,
    insertQuestionInfo,
    deleteQuestion,
    insertDefaultAnswerInfo,
 };