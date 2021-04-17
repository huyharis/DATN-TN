export default class CheckValue {
  static email(email) {
    const regExMail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regExMail.exec(email)) return false;
    return true;
  }
  static notNull(value) {
    const regnotNull = /[\s]/;
    if (regnotNull.exec(value)) return false;
    return true;
  }
  static passWord(value) {
    const reqPass = /^.{8,}$/;
    if (!reqPass.exec(value)) return false;
    return true;
  }
}
