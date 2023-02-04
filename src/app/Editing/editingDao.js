// 정보 수정
async function updateUserInfo(connection, updateUserInfoParams) {
    const updateUserQuery = `
    UPDATE user 
    SET name = ?, nickname = ?, birth = ?, education = ?, address = ?, introduce = ?, updatedAt = now()
    WHERE (userId = ?);`;

    const updateUserRow = await connection.query(updateUserQuery, updateUserInfoParams);
    return updateUserRow;
}


 // nickname으로 유저 검색
 async function selectUserNickname(connection, nickname) {
    const selectUserNicknameQuery = `
                    SELECT id, nickname
                    FROM user
                    WHERE nickname = ?;
                    `;
    const [nicknameRows] = await connection.query(selectUserNicknameQuery, nickname);
    return nicknameRows;
}


// 정보 수정
async function updatePasswordInfo(connection, updatePasswordInfoParams) {
    const updatePasswordQuery = `
    UPDATE user 
    SET password = ?, updatedAt = now()
    WHERE (userId = ?);`;

    const updatePasswordRow = await connection.query(updatePasswordQuery, updatePasswordInfoParams);
    return updatePasswordRow;
}


module.exports = {
    updateUserInfo,
    selectUserNickname,
    updatePasswordInfo,
 };
