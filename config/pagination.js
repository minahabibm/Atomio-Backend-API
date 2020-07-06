let offsetParam = 0;
let limitParam = 100;
const pagination = function (a, b) {
  if (b < 1) {
    return 'error pagination';
  }
  offsetParam = a;
  limitParam = b;

  return {
    offsetParam,
    limitParam
  };
};
module.exports = {
  offsetParam, limitParam, pagination
};
