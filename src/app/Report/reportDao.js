// Report 생성
async function insertReportInfo(connection, insertReportInfoParams) {
    const insertReportInfoQuery = `
          INSERT INTO report(userId, targetId, title, contents, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, now(), now());
      `;

    const insertReportInfoRow = await connection.query(
      insertReportInfoQuery,
      insertReportInfoParams,
    );
  
    return insertReportInfoRow;
  }

  async function updateWarningInfo(connection, userId) {
    const updateWarningInfoQuery = `
          UPDATE user SET warning=warning+1 where userId = ?;
      `;

    const updateWarningInfoRow = await connection.query(
      updateWarningInfoQuery,
      userId,
    );
  
    return updateWarningInfoRow;
  }
  
  module.exports = {
    insertReportInfo,
    updateWarningInfo,
 };