//  去除首位空格后是否未空字符串
export function isEmptyAfterTrim(val: string) {
  return val.trim().length === 0;
}

//  是否全部有英文 + 数字组成
export function isLetterAndNumber(val: string) {
  const reg = /^([0-9]|[a-z]|[A-Z])+$/;
  return reg.test(val);
}

//  校验是否是邮箱
export function isEmail(val: string) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/;
  return reg.test(val);
}
