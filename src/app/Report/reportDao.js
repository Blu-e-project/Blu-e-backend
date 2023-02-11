// Report 생성
async function insertReportInfo(connection, insertReportInfoParams) {
    const insertReportInfoQuery = `
          INSERT INTO report(userId, targetId, title, contents, image, createdAt, updatedAt)
          VALUES (?, (select userId from user where nickname = ?), ?, ?, ?, now(), now());
      `;

    const insertReportInfoRow = await connection.query(
      insertReportInfoQuery,
      insertReportInfoParams,
    );
  
    return insertReportInfoRow;
  }

  async function updateWarningInfo(connection, targetnickname) {
    const updateWarningInfoQuery = `
          UPDATE user SET warning=warning+1 where userId = (select userId from (select userId from user where nickname = "${targetnickname}") as t);
      `;

    const updateWarningInfoRow = await connection.query(
      updateWarningInfoQuery,
      targetnickname,
    );
  
    return updateWarningInfoRow;
  }

async function updateStatusInfo(connection, targetnickname) {
  const updateWarningInfoQuery = `
        UPDATE user SET status = if (warning >= 3, 0, 1) where userId = (select userId from (select userId from user where nickname = "${targetnickname}") as t) ;
    `;

  const updateWarningInfoRow = await connection.query(
    updateWarningInfoQuery,
    targetnickname,
  );

  return updateWarningInfoRow;
}


async function matchingCheck(connection, userId, targetnickname) {
  const matchingCheckInfoQuery = `
  SELECT matchingId 
  FROM matching 
  WHERE (matching.pickId IN (SELECT pickId FROM pick WHERE pick.userId = ${userId}) AND matching.pickCommentId IN (SELECT pickCommentId FROM pickComment WHERE pickComment.userId = (SELECT userId FROM user WHERE nickname = "${targetnickname}"))) 
  OR (matching.pickId IN (SELECT pickId FROM pick WHERE pick.userId = (SELECT userId FROM user WHERE nickname = "${targetnickname}")) AND matching.pickCommentId  IN (SELECT pickCommentId FROM pickComment WHERE pickComment.userId = ${userId}));
    `;

  const matchingCheckInfoRow = await connection.query(
    matchingCheckInfoQuery,
    userId, targetnickname,
  );

  return matchingCheckInfoRow;
}


async function statusCheck(connection, targetnickname) {
  const statusCheckInfoQuery = `
  select status from user where nickname = ?;
    `;

  const [statusCheckInfoRow] = await connection.query(
    statusCheckInfoQuery,
    targetnickname,
  );

  return statusCheckInfoRow;
}



  module.exports = {
    insertReportInfo,
    updateWarningInfo,
    updateStatusInfo,
    matchingCheck,
    statusCheck,
 };