/**
 * @function: randomizer()
 * @param {array} arr - input array
 * @param {number} limit - number of returned items in array. If none is passed it returns the full randomized array.
 *
 * @returns {array}
 */

const Randomizer = ([...arr], limit) => {
  const completeArr = limit === undefined;

  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }

  return completeArr ? arr : arr.slice(0, limit);
};

export default Randomizer;
