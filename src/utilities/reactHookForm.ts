export const RHFIdRules = {
  required: '아이디를 입력해 주세요.',
  maxLength: {
    value: 30,
    message: '최대 30자까지 입력 가능합니다.',
  },
  minLength: {
    value: 5,
    message: '최소 5자 이상 입력해야 합니다.',
  },
  pattern: {
    value: /^[A-Za-z0-9]*$/,
    message: '올바른 아이디 형식으로 입력해주세요.',
  },
};

export const RHFPasswordRules = {
  required: '비밀번호를 입력해 주세요.',
  maxLength: {
    value: 30,
    message: '최대 30자까지 입력 가능합니다.',
  },
  minLength: {
    value: 8,
    message: '최소 8자 이상 입력해야 합니다.',
  },
  pattern: {
    value: /(?=.*\d)(?=.*[a-zA-ZS])/,
    message: '올바른 비밀번호 형식으로 입력해주세요.',
  },
};
