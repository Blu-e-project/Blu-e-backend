// 정보 수정

async function updateUserInfo(connection, updateUserInfoParams) {
    const updateUserQuery = `
    UPDATE user 
    SET name = ?, nickname = ?, birth = ?, education = ?, address = ?, introduce = ?, updatedAt = now()
    WHERE (userId = ?);`;

    const updateUserRow = await connection.query(updateUserQuery, updateUserInfoParams);
    return updateUserRow;
  }

  module.exports = {
    updateUserInfo,
 };