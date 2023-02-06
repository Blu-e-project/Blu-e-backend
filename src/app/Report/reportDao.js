// Report 생성
async function insertReportInfo(connection, userId, targetnickname, title, contents, image) {
    const insertReportInfoQuery = `
          INSERT INTO report(userId, targetId, title, contents, image, createdAt, updatedAt)
          VALUES (${userId}, (select userId from user where nickname = '${targetnickname}'), "${title}", "${contents}", "${image}", now(), now());
      `;

    const insertReportInfoRow = await connection.query(
      insertReportInfoQuery,
      userId, targetnickname, title, contents, image
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

  module.exports = {
    insertReportInfo,
    updateWarningInfo,
    updateStatusInfo,
 };