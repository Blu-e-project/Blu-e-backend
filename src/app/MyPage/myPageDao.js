// 내가 쓴 멘토 구인글 조회
async function selectMyPickMentor(connection, userId) {
    const selectMyPickMentorListQuery = `
                      SELECT pickId, area, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                      FROM pick
                      WHERE role = 2 AND userId = ?;
                  `;
    const [myPickMentorRows] = await connection.query(selectMyPickMentorListQuery, userId);
    return myPickMentorRows;
};
//내가 쓴 멘티 구인글 조회
async function selectMyPickMentee(connection, userId) {
    const selectMyPickMenteeListQuery = `
                      SELECT pickId, area, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                      FROM pick
                      WHERE role = 1 AND userId = ?;
                  `;
    const [myPickMenteeRows] = await connection.query(selectMyPickMenteeListQuery, userId);
    return myPickMenteeRows;
};

//내가 댓글 쓴 멘토 구인글 조회
async function selectMyComPickMentor(connection, userId) {
    const selectMyComPickMentorListQuery = `
                      SELECT pickId, area, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                      FROM pick
                      WHERE role = 2 AND pickId in (SELECT pickId from pickComment where userId = ?);
                  `;
    const [myComPickMentorRows] = await connection.query(selectMyComPickMentorListQuery, userId);
    return myComPickMentorRows;
};
//내가 댓글 쓴 멘티 구인글 조회
async function selectMyComPickMentee(connection, userId) {
    const selectMyComPickMenteeListQuery = `
                      SELECT pickId, area, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                      FROM pick
                      WHERE role = 1 AND pickId in (SELECT pickId from pickComment where userId = ?);
                  `;
    const [myComPickMenteeRows] = await connection.query(selectMyComPickMenteeListQuery, userId);
    return myComPickMenteeRows;
};
module.exports = {
    selectMyPickMentor,
    selectMyPickMentee,
    selectMyComPickMentor,
    selectMyComPickMentee
};