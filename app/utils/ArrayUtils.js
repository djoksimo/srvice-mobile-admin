// @flow
class ArrayUtils {
  static objectToArrayOfKeyValuePairs(obj: Object): Array<Object> {
    return Object.keys(obj).map(key => ({ key: obj[key] }));
  }
}

export default ArrayUtils;
