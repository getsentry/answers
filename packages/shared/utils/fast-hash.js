// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript

const fastHash = input => {
  let hash = 0;
  if (input.length == 0) return hash;
  for (var i = 0; i < input.length; i++) {
    var char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export default fastHash;
