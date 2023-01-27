module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // request err
    SIGNUP_ID_EMPTY : { "isSuccess": false, "code": 2001, "message":"아이디를 입력해주세요" },
    SIGNUP_ID_LENGTH : { "isSuccess": false, "code": 2002, "message":"아이디는 35자리 미만으로 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2003, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2004, "message":"비밀번호가 20자리 미만으로 입력해주세요." },

    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2005, "message": "비밀번호를 입력 해주세요." },
    
    POSTPROBLEM_SUBJECT_EMPTY : { "isSuccess": false, "code": 2100, "message": "과목을 입력 해주세요." },
    POSTPROBLEM_PROBLEM_EMPTY : { "isSuccess": false, "code": 2101, "message": "문제를 입력 해주세요." },
    POSTPROBLEM_CONTENTS_EMPTY : { "isSuccess": false, "code": 2102, "message": "질문을 입력 해주세요." },
    POSTPROBLEM_SUBJECT_LENGTH : { "isSuccess": false, "code": 2103, "message": "과목을 15자리 이내로 입력해주세요." },
    POSTPROBLEM_UNIT_LENGTH : { "isSuccess": false, "code": 2104, "message": "단원을 20자리 이내로 입력해주세요." },
    POSTPROBLEM_PROBLEM_LENGTH : { "isSuccess": false, "code": 2105, "message": "문제를 300자 이내로 입력해주세요." },
    POSTPROBLEM_CONTENTS_LENGTH : { "isSuccess": false, "code": 2106, "message": "질문을 300자 이내로 입력해주세요." },

    PROBLEM_PROBLEMID_EMPTY : { "isSuccess": false, "code": 2201, "message": "문제ID를 입력해주세요." },


    USER_USERID_EMPTY: { "isSuccess": false, "code": 2201, "message": "사용자ID를 입력해주세요." },
    USER_USERid_WRONG : { "isSuccess": false, "code": 2201, "message": "사용자ID가 잘못 되었습니다." },


    // response err
    SIGNIN_ID_WRONG : { "isSuccess": false, "code": 3001, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3002, "message": "비밀번호가 잘못 되었습니다." },

    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3003, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3004, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

     //Connection, Transaction 등의 server err
     DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
     SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
     TOKEN_EMPTY : { "isSuccess": false, "code": 4002, "message": "토큰을 입력해주세요"},
     TOKEN_VERIFICATION_FAILURE :  {"isSuccess": false, "code": 4003, "message": "토큰 검증에 실패했습니다."}
}