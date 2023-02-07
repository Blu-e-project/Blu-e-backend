// 내가 쓴 멘토 구인글 조회
async function selectMyPickMentor(connection, userId) {
    const selectMyPickMentorListQuery = `
                      SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                      FROM pick
                      WHERE role = 2 AND userId = ?;
                  `;
    const [myPickMentorRows] = await connection.query(selectMyPickMentorListQuery, userId);
    return myPickMentorRows;
};
//내가 쓴 멘티 구인글 조회
async function selectMyPickMentee(connection, userId) {
    const selectMyPickMenteeListQuery = `
                      SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                      FROM pick
                      WHERE role = 1 AND userId = ?;
                  `;
    const [myPickMenteeRows] = await connection.query(selectMyPickMenteeListQuery, userId);
    return myPickMenteeRows;
};

//내가 댓글 쓴 멘토 구인글 조회
//내가 댓글 쓴 멘티 구인글 조회
module.exports = {
    selectMyPickMentor,
    selectMyPickMentee
};