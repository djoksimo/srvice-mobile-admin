class ArrayUtils {
  static objectToArrayOfKeyValuePairs(
    obj: Record<string, any>,
  ): Array<Record<string, any>> {
    return Object.keys(obj).map((key) => ({key: obj[key]}));
  }
}

export default ArrayUtils;
