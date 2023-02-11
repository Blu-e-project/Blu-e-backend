// 내가 쓴 멘토 구인글 조회
async function selectMyPickMentor(connection, userId) {
    const selectMyPickMentorListQuery = `
                      SELECT pickId, area, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, wishGender
                      FROM pick
                      WHERE role = 2 AND userId = ?;
                  `;
    const [myPickMentorRows] = await connection.query(selectMyPickMentorListQuery, userId);
    return myPickMentorRows;
};
//내가 쓴 멘티 구인글 조회
async function selectMyPickMentee(connection, userId) {
    const selectMyPickMenteeListQuery = `
                      SELECT pickId, area, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, wishGender
                      FROM pick
                      WHERE role = 1 AND userId = ?;
                  `;
    const [myPickMenteeRows] = await connection.query(selectMyPickMenteeListQuery, userId);
    return myPickMenteeRows;
};

//내가 댓글 쓴 멘토 구인글 조회
async function selectMyComPickMentor(connection, userId) {
    const selectMyComPickMentorListQuery = `
                      SELECT pickId, area, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, wishGender
                      FROM pick
                      WHERE role = 2 AND pickId in (SELECT pickId from pickComment where userId = ?);
                  `;
    const [myComPickMentorRows] = await connection.query(selectMyComPickMentorListQuery, userId);
    return myComPickMentorRows;
};
//내가 댓글 쓴 멘티 구인글 조회
async function selectMyComPickMentee(connection, userId) {
    const selectMyComPickMenteeListQuery = `
                      SELECT pickId, area, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, wishGender
                      FROM pick
                      WHERE role = 1 AND pickId in (SELECT pickId from pickComment where userId = ?);
                  `;
    const [myComPickMenteeRows] = await connection.query(selectMyComPickMenteeListQuery, userId);
    return myComPickMenteeRows;
};


// 멘토링 내역 조회
async function mentoringList(connection, userId){
    const mentoringListQuery = `
        SELECT matching.matchingId, user.nickname, IF(datediff(pick.periodEnd,sysdate())>0, 1, 0) as state, user.userImg
        FROM matching
        JOIN user ON user.userId = ${userId}
        JOIN pick ON pick.userId = ${userId}
        WHERE (SELECT userId FROM pick WHERE pick.pickId = matching.pickId) = ${userId} OR (SELECT userId FROM pickComment WHERE pickComment.pickCommentId = matching.pickCommentId) = ${userId}
    ;
    `;
    const [mentoringListRows] = await connection.query(mentoringListQuery, userId);
    return mentoringListRows;
  
  }

module.exports = {
    selectMyPickMentor,
    selectMyPickMentee,
    selectMyComPickMentor,
    selectMyComPickMentee,
    mentoringList
};