function find(source, predicate) {
  //check for invalid arguments
  if (!source) {
    return null;
  }
  //loop through source to find match based on name
  let target;
  var current = null;
  Object.keys(source).some(key => {
    current = source[key];
    if ( predicate(current, key) ) {
      target = current;
      return true;
    }
  });
  //return found value or null
  return target;
}

module.exports = {
  find
}