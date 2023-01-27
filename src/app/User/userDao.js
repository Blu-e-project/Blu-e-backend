// 모든 qusetion 조회
async function selectQuestion(connection,userId) {
    const selectQuestionListQuery = `
                  SELECT title, contents 
                  FROM question
                  WHERE userId = ?;
                  `;
    const [questionRows] = await connection.query(selectQuestionListQuery,userId);
    return questionRows;
  }

  // id로 유저 조회
async function selectUserId(connection, id) {
    // role은 멘토인지 멘티인지
    const selectUserIdQuery = `
                    SELECT id, nickname, role
                    FROM user
                    WHERE id = ?;
                    `;
    const [idRows] = await connection.query(selectUserIdQuery, id);
    return idRows;
}

// 유저 삽입
async function insertUser(connection, insertUserParams) {
    const insertUserQuery =`
                INSERT INTO user (userId, id, password, nickname)
                VALUES (?, ? ,?, ?);
                `;

    const insertUserRow = await connection.query(
        insertUserQuery,
        insertUserParams
    );

    return insertUserRow;
  }

// id와 password로 유저 조회
async function selectUserPassword(connection, selectUserPasswordParams){
    console.log(selectUserPasswordParams)
    const selectPasswordQuery = `
        SELECT userId, id, nickname, password
        FROM user
        WHERE id = ? AND password = ?;
    `;
    
    const selectUserPasswordRow = await connection.query(
        selectPasswordQuery,
        selectUserPasswordParams
    );
    return selectUserPasswordRow;
}

async function selectUserAccount(connection, id) {
    const selectUserAccountQuery = `
        SELECT userId, id, status 
        FROM user
        WHERE id = ?    
    `
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        id
    );
    return selectUserAccountRow[0];
}


  // 멘토 전체 조회(최근 가입한 순)
  async function selectMentor(connection) {
    const selectMentorListQuery = `
                  SELECT nickname, userImg 
                  FROM user 
                  WHERE role=1
                  ORDER BY userId DESC;
                  `;
    const [mentorRows] = await connection.query(selectMentorListQuery);
    return mentorRows;
  }



  // 멘티 전체 조회(최근 가입한 순)
  async function selectMentee(connection) {
    const selectMenteeListQuery = `
                  SELECT nickname, userImg 
                  FROM user 
                  WHERE role=2
                  ORDER BY userId DESC;
                  `;
    const [menteeRows] = await connection.query(selectMenteeListQuery);
    return menteeRows;
  }



module.exports = {
    selectQuestion,
    selectUserId,
    insertUser,
    selectUserPassword,
    selectUserAccount,
    selectMentee,
    selectMentor
  };
  
  