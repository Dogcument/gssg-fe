import moment from "moment-timezone";

export function getLocalizedTimeString(utcTime) {
  return moment.utc(utcTime).format("YYYY.MM.DD HH:mm:ss");
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const SortingTypeEnum = {
  Time: 0,
  Like: 1,
};

export function getSortingTypeText(sortingType) {
  switch(sortingType) {
    case SortingTypeEnum.Like:
      return "좋아요 순";
    case SortingTypeEnum.Time:
      return "시간 순";
    default:
      return "????";
  }
}

// From
// https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=vucket&logNo=220930066224
/*
 Password Validator 0.1
 (c) 2007 Steven Levithan 
 MIT License
*/

export function validatePassword(pw, options) {
  // default options (allows any password)
  var o = {
    lower: 0,
    upper: 0,
    alpha: 0 /* lower + upper */,
    numeric: 0,
    special: 0,
    length: [0, Infinity],
    custom: [
      /* regexes and/or functions */
    ],
    badWords: [],
    badSequenceLength: 0,
    noQwertySequences: false,
    noSequential: false,
  };

  for (var property in options) o[property] = options[property];

  var re = {
      lower: /[a-z]/g,
      upper: /[A-Z]/g,
      alpha: /[A-Z]/gi,
      numeric: /[0-9]/g,
      special: /[\W_]/g,
    },
    rule,
    i;

  // enforce min/max length
  if (pw.length < o.length[0] || pw.length > o.length[1]) return false;

  // enforce lower/upper/alpha/numeric/special rules
  for (rule in re) {
    if ((pw.match(re[rule]) || []).length < o[rule]) return false;
  }

  // enforce word ban (case insensitive)
  for (i = 0; i < o.badWords.length; i++) {
    if (pw.toLowerCase().indexOf(o.badWords[i].toLowerCase()) > -1)
      return false;
  }

  // enforce the no sequential, identical characters rule
  if (o.noSequential && /([\S\s])\1/.test(pw)) return false;

  // enforce alphanumeric/qwerty sequence ban rules
  if (o.badSequenceLength) {
    var lower = "abcdefghijklmnopqrstuvwxyz",
      upper = lower.toUpperCase(),
      numbers = "0123456789",
      qwerty = "qwertyuiopasdfghjklzxcvbnm",
      start = o.badSequenceLength - 1,
      seq = "_" + pw.slice(0, start);
    for (i = start; i < pw.length; i++) {
      seq = seq.slice(1) + pw.charAt(i);
      if (
        lower.indexOf(seq) > -1 ||
        upper.indexOf(seq) > -1 ||
        numbers.indexOf(seq) > -1 ||
        (o.noQwertySequences && qwerty.indexOf(seq) > -1)
      ) {
        return false;
      }
    }
  }

  // enforce custom regex/function rules
  for (i = 0; i < o.custom.length; i++) {
    rule = o.custom[i];
    if (rule instanceof RegExp) {
      if (!rule.test(pw)) return false;
    } else if (rule instanceof Function) {
      if (!rule(pw)) return false;
    }
  }

  // great success!
  return true;
}
