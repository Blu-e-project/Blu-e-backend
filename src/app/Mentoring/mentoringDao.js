  // 멘토 구인글 전체 조회
async function selectPickMentor(connection) {
  const selectPickMentorListQuery = `
                    SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
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
                    SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                    FROM pick 
                    WHERE role = 1
                    order by pickMenteeId desc;
                  `;
    const [pickMenteeRows] = await connection.query(selectPickMenteeListQuery);
    return pickMenteeRows;
  }

    // 멘토 구인글 부분 조회(5개)
   async function selectPickMentorMain(connection) {
    const selectPickMentorMainListQuery = `
                      SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                      FROM pick
                      WHERE role = 2
                      ORDER BY viewCount desc
                      LIMIT 5;
                  `;
    const [pickMentorMainRows] = await connection.query(selectPickMentorMainListQuery);
    return pickMentorMainRows;
  }
  
  
    // 멘티 구인글 부분 조회(5개)
    async function selectPickMenteeMain(connection) {
      const selectPickMenteeMainListQuery = `
                      SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                      FROM pick 
                      WHERE role = 1
                      ORDER BY viewCount desc
                      LIMIT 5;
                    `;
      const [pickMenteeMainRows] = await connection.query(selectPickMenteeMainListQuery);
      return pickMenteeMainRows;
    }
    
    // 멘토 구인글 작성
    async function insertPickMentors(connection, insertPickMentorsParams) {
      const insertPickMentorsQuery = `
            INSERT INTO Pick(userId, title, contents, status, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender, role, viewCount)
            VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, 2, 0);
        `;
      const insertPickMentorsRows = await connection.query(
        insertPickMentorsQuery,
        insertPickMentorsParams
      );
    
      return insertPickMentorsRows;
    }

    // 멘티 구인글 작성
    async function insertPickMentees(connection, insertPickMenteesParams) {
      const insertPickMenteesQuery = `
            INSERT INTO Pick(userId, title, contents, status, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender, role, viewCount)
            VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, 1, 0);
        `;
      const insertPickMenteesRows = await connection.query(
        insertPickMenteesQuery,
        insertPickMenteesParams
      );
    
      return insertPickMenteesRows;
    }


    // 특정 멘토 구인글 조회
   async function selectPickMentorById(connection, pickId) {
     const selectPickMentorIdQuery = `
                 SELECT userId, title, contents, CASE status when 1 THEN '모집중' else '모집완료' END as status, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender, viewCount, date(createdAt) as 'createdAt', date(updatedAt) as 'updatedAt' 
                 FROM pick 
                 WHERE role=2 AND pickId=?;
                 `;
     const [pickMentorRow] = await connection.query(selectPickMentorIdQuery, pickId);
     return pickMentorRow;
}

    // 특정 멘티 구인글 조회
    async function selectPickMenteeById(connection, pickId) {
      const selectPickMenteeIdQuery = `
                  SELECT userId, title, contents, CASE status when 1 THEN '모집중' else '모집완료' END as status, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender, viewCount, date(createdAt) as 'createdAt', date(updatedAt) as 'updatedAt' 
                  FROM pick 
                  WHERE role=1 AND pickId=?;
                  `;
      const [pickMenteeRow] = await connection.query(selectPickMenteeIdQuery, pickId);
      return pickMenteeRow;
 }
  
  module.exports = {
    selectPickMentee,
    selectPickMentor,
    selectPickMentorMain,
    selectPickMenteeMain,
    insertPickMentors,
    insertPickMentees,
    selectPickMentorById,
    selectPickMenteeById
  };
  