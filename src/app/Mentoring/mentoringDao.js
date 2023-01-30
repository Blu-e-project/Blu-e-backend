  // 멘토 구인글 전체 조회
async function selectPickMentor(connection) {
  const selectPickMentorListQuery = `
                    SELECT pickMenteeId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                    FROM pick 
                    WHERE role = 2
                    order by pickMenteeId desc;
                `;
  const [pickMentorRows] = await connection.query(selectPickMentorListQuery);
  return pickMentorRows;
}


  // 멘티 구인글 전체 조회
  async function selectPickMentee(connection) {
    const selectPickMenteeListQuery = `
                    SELECT pickMenteeId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                    FROM pick 
                    WHERE role = 1
                    order by pickMenteeId desc;
                  `;
    const [pickMenteeRows] = await connection.query(selectPickMenteeListQuery);
    return pickMenteeRows;
  }

  
  module.exports = {
    selectPickMentee,
    selectPickMentor,
  };
  