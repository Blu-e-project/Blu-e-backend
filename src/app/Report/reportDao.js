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

  module.exports = {
    insertReportInfo,
 };