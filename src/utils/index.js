import dottie from 'dottie';

// getKeys :: obj -> [keys]
export const getKeys = (obj, prefix = '') =>
  Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el]) ) {
      return res;
    } else if (typeof obj[el] === 'object' && obj[el] !== null ) {
      // if obj, get nested children
      return [
        ...res,
        ...getKeys(obj[el], prefix + el + '/')
      ];
    } else {
      // else return key
      return [...res, prefix + el];
    }
}, []);

// return object with nested children
export const assignWithPath = (obj, path, value) => {
  dottie.set(obj, path.replace(/\//g, '.'), value);
  return obj;
}

export const parseMqttMessage = (message) => {
  switch(message) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return message;
  }
}

// const v1 = {};
// const v2 = {ciao: {mamma:2, cacca:1,}};
// console.log(assignWithPath(v2, 'ciao/mamma', 3));
