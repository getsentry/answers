/**
 * Used to generate a UUID, we use the same thing in static sites:
 * https://github.com/getsentry/reload/blob/6872c52a31f3a601fd68196660b08f9d072386b6/client/ra.js#L10
 *
 * Originally from: http://stackoverflow.com/a/8809472/3842656
 */
const generateUUID = () => {
  var d = new Date().getTime();
  if (
    typeof window !== 'undefined' &&
    window.performance &&
    typeof window.performance.now === 'function'
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export default generateUUID;
