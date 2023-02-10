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

    RESETPASSWORD_ID_EMPTY: { "isSuccess": false, "code": 2021, "message": "아이디를 입력해주세요."},
    RESETPASSWORD_ID_LENGTH: { "isSuccess": false, "code": 2022, "message": "아이디는 35자리 이하로 입력해주세요."},
    RESETPASSWORD_PASSWORD_EMPTY: { "isSuccess": false, "code": 2023, "message": "비밀번호를 입력해주세요."},
    RESETPASSWORD_PASSWORD_LENGTH: { "isSuccess": false, "code": 2024, "message": "비밀번호는 20자리 이하로 입력해주세요."},
    RESETPASSWORD_PASSWORDCHECK_EMPTY: { "isSuccess": false, "code": 2025, "message": "비밀번호 재확인을 입력해주세요."},
    RESETPASSWORD_PASSWORD_WRONG: { "isSuccess": false, "code": 2026, "message": "비밀번호 재입력이 올바르지 않습니다."},
    RESETPASSWORD_ID_WRONG: { "isSuccess": false, "code": 2027, "message": "가입하신 아이디가 올바르지 않습니다."},

    POSTPROBLEM_SUBJECT_EMPTY : { "isSuccess": false, "code": 2100, "message": "과목을 입력해주세요." },
    POSTPROBLEM_PROBLEM_EMPTY : { "isSuccess": false, "code": 2101, "message": "문제를 입력해주세요." },
    POSTPROBLEM_CONTENTS_EMPTY : { "isSuccess": false, "code": 2102, "message": "질문을 입력해주세요." },
    POSTPROBLEM_SUBJECT_LENGTH : { "isSuccess": false, "code": 2103, "message": "과목을 15자리 이내로 입력해주세요." },
    POSTPROBLEM_UNIT_LENGTH : { "isSuccess": false, "code": 2104, "message": "단원을 20자리 이내로 입력해주세요." },
    POSTPROBLEM_PROBLEM_LENGTH : { "isSuccess": false, "code": 2105, "message": "문제를 300자 이내로 입력해주세요." },
    POSTPROBLEM_CONTENTS_LENGTH : { "isSuccess": false, "code": 2106, "message": "질문을 300자 이내로 입력해주세요." },
    
    PROBLEM_PROBLEMID_EMPTY : { "isSuccess": false, "code": 2107, "message": "문제ID를 입력해주세요." },
    PROBLEM_SOLUTIONID_EMPTY : { "isSuccess": false, "code": 2108, "message": "답변ID를 입력해주세요." },
    PROBLEM_USERID_EMPTY : { "isSuccess": false, "code": 2109, "message": "사용자ID를 입력해주세요." },

    USER_USERID_EMPTY: { "isSuccess": false, "code": 2201, "message": "사용자ID를 입력해주세요." },
    USER_USERid_WRONG : { "isSuccess": false, "code": 2201, "message": "사용자ID가 잘못 되었습니다." },

    QUESTION_TITLE_LENGTH : {"isSuccess": false, "code": 2300, "message": "제목을 20자 이내로 입력해주세요."},
    QUESTION_CONTENTS_LENGTH : {"isSuccess": false, "code": 2301, "message": "내용을 500자 이내로 입력해주세요."},
    QUESTION_QUESTIONID_EMPTY : { "isSuccess": false, "code": 2302, "message": "QUESTIONID를 입력해주세요." },
    QUESTION_USERID_EMPTY: { "isSuccess": false, "code": 2303, "message": "사용자ID를 입력해주세요." },
    QUESTION_TITLE_EMPTY: { "isSuccess": false, "code": 2304, "message": "제목을 입력해주세요." },
    QUESTION_CONTENTS_EMPTY: { "isSuccess": false, "code": 2305, "message": "내용을 입력해주세요." },

    REPORT_TARGETNICKNAME_EMPTY : {"isSuccess": false, "code": 2400, "message": "신고할 멘토 닉네임을 입력해주세요."},
    REPORT_TITLE_EMPTY: { "isSuccess": false, "code": 2401, "message": "제목을 입력해주세요." },
    REPORT_CONTENTS_EMPTY: { "isSuccess": false, "code": 2402, "message": "내용을 입력해주세요." },
    REPORT_TITLE_LENGTH : {"isSuccess": false, "code": 2403, "message": "제목을 20자 이내로 입력해주세요."},
    REPORT_CONTENTS_LENGTH : {"isSuccess": false, "code": 2404, "message": "내용을 500자 이내로 입력해주세요."},

    EDITING_USERID_EMPTY: { "isSuccess": false, "code": 2500, "message": "사용자ID를 입력해주세요." },
    EDITING_NAME_EMPTY: { "isSuccess": false, "code": 2501, "message": "이름을 입력해주세요." },
    EDITING_NICKNAME_EMPTY: { "isSuccess": false, "code": 2502, "message": "닉네임을 입력해주세요." },
    EDITING_BIRTH_EMPTY: { "isSuccess": false, "code": 2503, "message": "생일을 입력해주세요." },
    EDITING_EDUCATION_EMPTY: { "isSuccess": false, "code": 2504, "message": "학력을 입력해주세요." },
    EDITING_ADDRESS_EMPTY: { "isSuccess": false, "code": 2505, "message": "실거주지를 입력해주세요." },
    EDITING_INTRODUCE_EMPTY: { "isSuccess": false, "code": 2506, "message": "자기소개를 입력해주세요." },

    EDITING_NAME_LENGTH : { "isSuccess": false, "code": 2507, "message": "이름을 7자 이내로 입력해주세요." },
    EDITING_NICKNAME_LENGTH: { "isSuccess": false, "code": 2508, "message": "닉네임을 7자 이내로 입력해주세요." },
    EDITING_EDUCATION_LENGTH: { "isSuccess": false, "code": 2509, "message": "학력을 20자 이내로 입력해주세요." },
    EDITING_ADDRESS_LENGTH: { "isSuccess": false, "code": 2510, "message": "실거주지는 50자 이하로 입력해주세요." },
    EDITING_INTRODUCE_LENGTH: { "isSuccess": false, "code": 2511, "message": "자기소개는 100자리 이하로 입력해주세요." },
    EDITING_PASSWORD_EMPTY: { "isSuccess": false, "code": 2512, "message": "비밀번호를 입력해주세요." },
    EDITING_PASSWORD_LENGTH: { "isSuccess": false, "code": 2513, "message": "비밀번호가 20자리 미만으로 입력해주세요." },


    POSTPICK_TITLE_EMPTY : {"isSuccess": false, "code": 2600, "message": "제목을 입력해주세요."},
    POSTPICK_CONTENTS_EMPTY : {"isSuccess": false, "code": 2601, "message": "내용을 입력해주세요."},
    POSTPICK_SUBJECT_EMPTY : {"isSuccess": false, "code": 2602, "message": "과목을 입력해주세요."},
    POSTPICK_AREA_EMPTY: {"isSuccess": false, "code": 2603, "message": "지역을 입력해주세요."},
    POSTPICK_MENTORINGMETHOD_EMPTY : {"isSuccess": false, "code": 2604, "message": "멘토링 방식을 입력해주세요."},
    POSTPICK_MENTORCAREER_EMPTY : {"isSuccess": false, "code": 2605, "message": "희망 멘토경력을 입력해주세요."},
    POSTPICK_PERIODSTART_EMPTY : {"isSuccess": false, "code": 2606, "message": "희망 시작기간을 입력해주세요."},
    POSTPICK_PERIODEND_EMPTY : {"isSuccess": false, "code": 2607, "message": "희망 종료기간을 입력해주세요."},
    POSTPICK_WISHGENDER_EMPTY : {"isSuccess": false, "code": 2608, "message": "희망 성별을 입력해주세요."},
    POSTPICK_MENTEELEVEL_EMPTY : {"isSuccess": false, "code": 2609, "message": "희망 멘티수준을 입력해주세요."},
    POSTPICK_TITLE_LENGTH : {"isSuccess": false, "code": 2610, "message": "제목을 30자 이내로 입력해주세요."},
    POSTPICK_CONTENTS_LENGTH : {"isSuccess": false, "code": 2611, "message": "내용을 300자 이내로 입력해주세요."}, 
    POSTPICK_SUBJECT_LENGTH : {"isSuccess": false, "code": 2612, "message": "과목을 15자 이내로 입력해주세요."},
    POSTPICKM_AREA_LENGTH : {"isSuccess": false, "code": 2613, "message": "지역을 50자 이내로 입력해주세요."},
    POSTPICK_MENTORINGMETHOD_LENGTH : {"isSuccess": false, "code": 2614, "message": "희망 멘토링 방식을 10자 이내로 입력해주세요."},
    POSTPICK_MENTORCAREER_LENGTH : {"isSuccess": false, "code": 2615, "message": "희망 멘토경력을 10자 이내로 입력해주세요."},
    POSTPICK_WISHGENDER_LENGTH : {"isSuccess": false, "code": 2616, "message": "희망 성별을 10자 이내로 입력해주세요."},
    POSTPICK_MENTEELEVEL_LENGTH : {"isSuccess": false, "code": 2617, "message": "희망 멘티수준을 10자 이내로 입력해주세요."},

    MENTORMENTEE_AUTH : {"isSuccess": false, "code": 2618, "message": "접근 권한이 없습니다."},
    MATCHING_AUTH : {"isSuccess": false, "code": 2619, "message": "매칭테이블에 있습니다."},


    PICKCOMMENT_COMMENT_EMPTY : { "isSuccess": false,"code": 2700,"message":"댓글 내용을 입력해주세요." },
    PICKCOMMENT_COMMENT_LENGTH : { "isSuccess": false,"code": 2701,"message":"댓글 내용은 300자 이하로 입력해주세요." },
    PICKCOMMENT_PICKID_EMPTY: {"isSuccess": false, "code": 2702, "message": "pickId가 비어있습니다."},
    PICKCOMMENT_COMMENTID_EMPTY:{"isSuccess": false, "code": 2703, "message": "pickCommentId가 비어있습니다."},
    PICKCOMMENT_ROLE_WRONG:{"isSuccess": false, "code": 2704, "message": "댓글을 다는 role이 잘못 되었습니다."},
    PICKCOMMENT_USERID_WRONG:{"isSuccess": false, "code": 2705, "message": "댓글 작성자와 일치하지 않습니다."},

    REVIEW_NICKNAME_EMPTY : { "isSuccess": false, "code": 2800, "message": "닉네임을 입력해주세요." },
    REVIEW_SUBJECT_EMPTY : { "isSuccess": false, "code": 2801, "message": "과목을 입력해주세요." },
    REVIEW_CONTENTS_EMPTY : { "isSuccess": false, "code": 2802, "message": "내용을 입력해주세요." },
    REVIEW_USERID_EMPTY : { "isSuccess": false, "code": 2803, "message": "사용자 ID를 입력해주세요." },
    REVIEW_REVIEWID_EMPTY : { "isSuccess": false, "code": 2804, "message": "리뷰 ID를 입력해주세요." },

    REVIEW_NICKNAME_LENGTH : { "isSuccess": false, "code": 2805, "message": "닉네임을 7자 이내로 입력해주세요." },
    REVIEW_SUBJECT_LENGTH : { "isSuccess": false, "code": 2806, "message": "과목을 15자 이내로 입력해주세요." },
    REVIEW_CONTENTS_LENGTH : { "isSuccess": false, "code": 2807, "message": "내용을 300자 이내로 입력해주세요." },
    REVIEW_NICKNAME_NOT_EXIST : { "isSuccess": false, "code": 2808, "message": "존재하지 않는 닉네임입니다." },
    REVIEW_MATCHING_NOT_EXIST : { "isSuccess": false, "code": 2809, "message": "매칭 정보가 존재하지 않습니다." },
    REVIEW_REVIEW_EXIST : { "isSuccess": false, "code": 2810, "message": "이미 작성한 리뷰입니다." },

    MATCHING_USERID_WRONG:{"isSuccess": false, "code": 2901, "message": "글 작성자와 일치하지 않습니다."},

    // response err
    SIGNUP_REDUNDANT_ID : { "isSuccess": false, "code": 3001, "message":"중복된 아이디입니다." },
    SIGNIN_ID_WRONG : { "isSuccess": false, "code": 3002, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3003, "message": "비밀번호가 잘못 되었습니다." },

    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3004, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    //SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3005, "message":"중복된 닉네임입니다." },
    SIGNUP_REDUNDANT_PHONENUM: { "isSuccess": false, "code": 3006, "message":"중복된 전화번호입니다." },

    REPORT_MATCHING_EMPTH : {"isSuccess": false, "code": 3400, "message": "매칭되어 있지 않은 유저입니다."},
    REPORT_TARGETUSER_STATUS_0 : {"isSuccess": false, "code": 3401, "message": "이미 탈퇴한 유저입니다."},
    
    EDITING_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3500, "message":"중복된 닉네임입니다." },
    EDITING_PASSWORD_DIFFERENT: { "isSuccess": false, "code": 3501, "message":"새 비밀번호를 동일하게 입력해주세요." },

    PICKCOMMENT_COMMENT_REDUNDANT: { "isSuccess": false, "code": 3701, "message":"이미 댓글을 다셨습니다." },

    MATCHING_ACCEPT_INACTIVE: { "isSuccess": false, "code": 3901, "message":"이미 매칭되어 수락 버튼을 활성화 할 수 없습니다." },

     //Connection, Transaction 등의 server err
     DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
     SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
     TOKEN_EMPTY : { "isSuccess": false, "code": 4002, "message": "토큰을 입력해주세요"},
     TOKEN_VERIFICATION_FAILURE :  {"isSuccess": false, "code": 4003, "message": "토큰 검증에 실패했습니다."}
}