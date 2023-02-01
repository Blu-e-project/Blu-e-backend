module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // request err
    SIGNUP_ID_EMPTY : { "isSuccess": false, "code": 2001, "message":"아이디를 입력해주세요" },
    SIGNUP_ID_LENGTH : { "isSuccess": false, "code": 2002, "message":"아이디는 35자리 미만으로 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2003, "message": "비밀번호를 입력해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2004, "message":"비밀번호가 20자리 미만으로 입력해주세요." },
    SIGNUP_PHONENUM_EMPTY : { "isSuccess": false, "code": 2005, "message": "휴대전화를 입력해주세요." },
    SIGNUP_PHONENUM_LENGTH : { "isSuccess": false, "code": 2006, "message":"휴대전화는 13자리 이하로 입력해주세요." },
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2007, "message":"이름을 입력해주세요." },
    SIGNUP_NAME_LENGTH : { "isSuccess": false, "code": 2008, "message":"이름은 7자리 이하로 입력해주세요." },  
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2009, "message":"닉네임을 입력해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2010,"message":"닉네임은 최대 20자리를 입력해주세요." },
    SIGNUP_BIRTH_EMPTY : { "isSuccess": false, "code": 2011, "message":"생년월일을 입력해주세요." },
    SIGNUP_EDUCATION_EMPTY : { "isSuccess": false, "code": 2012, "message":"학력을 입력해주세요." },
    SIGNUP_EDUCATION_LENGTH : { "isSuccess": false,"code": 2013,"message":"학력은 20자리 이하로 입력해주세요." },
    SIGNUP_DEPARTMENT_LENGTH : { "isSuccess": false,"code": 2014,"message":"학과는 20자리 이하로 입력해주세요." },
    SIGNUP_ADDRESS_LENGTH : { "isSuccess": false,"code": 2015,"message":"실거주지는 50자 이하로 입력해주세요." },
    SIGNUP_INTRODUCE_LENGTH : { "isSuccess": false,"code": 2016,"message":"자기소개는 100자리 이하로 입력해주세요." },

    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2017, "message": "비밀번호를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2018, "message": "해당 회원이 존재하지 않습니다." },
    
    SMS_SEND_FAILURE:{ "isSuccess": false,"code": 2019,"message":"인증 문자 발신에 실패했습니다." },
    FAILURE_SMS_AUTHENTICATION : { "isSuccess": false,"code": 2020,"message":"휴대폰 번호 인증 실패했습니다." },

    POSTPROBLEM_SUBJECT_EMPTY : { "isSuccess": false, "code": 2100, "message": "과목을 입력 해주세요." },
    POSTPROBLEM_PROBLEM_EMPTY : { "isSuccess": false, "code": 2101, "message": "문제를 입력 해주세요." },
    POSTPROBLEM_CONTENTS_EMPTY : { "isSuccess": false, "code": 2102, "message": "질문을 입력 해주세요." },
    POSTPROBLEM_SUBJECT_LENGTH : { "isSuccess": false, "code": 2103, "message": "과목을 15자리 이내로 입력해주세요." },
    POSTPROBLEM_UNIT_LENGTH : { "isSuccess": false, "code": 2104, "message": "단원을 20자리 이내로 입력해주세요." },
    POSTPROBLEM_PROBLEM_LENGTH : { "isSuccess": false, "code": 2105, "message": "문제를 300자 이내로 입력해주세요." },
    POSTPROBLEM_CONTENTS_LENGTH : { "isSuccess": false, "code": 2106, "message": "질문을 300자 이내로 입력해주세요." },

    PROBLEM_PROBLEMID_EMPTY : { "isSuccess": false, "code": 2201, "message": "문제ID를 입력해주세요." },
    PROBLEM_SOLUTIONID_EMPTY : { "isSuccess": false, "code": 2202, "message": "답변ID를 입력해주세요." },

    USER_USERID_EMPTY: { "isSuccess": false, "code": 2201, "message": "사용자ID를 입력해주세요." },
    USER_USERid_WRONG : { "isSuccess": false, "code": 2201, "message": "사용자ID가 잘못 되었습니다." },

    QUESTION_TITLE_LENGTH : {"isSuccess": false, "code": 2300, "message": "제목을 30자리 이내로 입력해주세요."},
    QUESTION_CONTENTS_EMPTY : {"isSuccess": false, "code": 2301, "message": "내용을 입력해주세요."},
    QUESTION_QUESTIONID_EMPTY : { "isSuccess": false, "code": 2302, "message": "QUESTIONID를 입력해주세요." },
    QUESTION_USERID_EMPTY: { "isSuccess": false, "code": 2303, "message": "사용자ID를 입력해주세요." },


    // response err
    SIGNUP_REDUNDANT_ID : { "isSuccess": false, "code": 3001, "message":"중복된 아이디입니다." },
    SIGNIN_ID_WRONG : { "isSuccess": false, "code": 3002, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3003, "message": "비밀번호가 잘못 되었습니다." },

    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3003, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3004, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

     //Connection, Transaction 등의 server err
     DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
     SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
     TOKEN_EMPTY : { "isSuccess": false, "code": 4002, "message": "토큰을 입력해주세요"},
     TOKEN_VERIFICATION_FAILURE :  {"isSuccess": false, "code": 4003, "message": "토큰 검증에 실패했습니다."}
}