var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var WHITESPACE = /\s*/;

function trim(str) {
  return str.replace(WHITESPACE, '');
}

function extractArgs(func) {
  return func
    .toString()
    .replace(COMMENTS, '')
    .match(FN_ARGS)[1]
    .split(/,/)
    .map(trim);
}

export default extractArgs;
