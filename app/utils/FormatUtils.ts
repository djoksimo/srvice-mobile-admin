class FormUtils {
  static enforceNums(text: string): string {
    return text.replace(/[^0-9.]/g, '');
  }

  static truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      const trimmedString = `${text.substr(0, maxLength)}...`;
      return `${trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
      )}...`;
    }
    return text;
  }

  static shuffle(arr: Array<any>) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
  }

  static commaSeparateArray(array: Array<string>): string {
    if (array === undefined) return '';
    return array.join(', ');
  }

  static newLineSeparateArray(array: Array<string>): string {
    if (array === undefined) return '';
    return array.join('\n');
  }

  static pluralToSingular(text: string): string {
    if (!text) {
      return '';
    }
    const lastIndex = text.length - 1;
    if (text[lastIndex] === 's') {
      return text.slice(0, lastIndex);
    }
    return text;
  }

  static replaceNewlinesWithSpaces(text: string): string {
    return text.replace(/\n/g, ' ');
  }

  static isValidEmailFormat(email: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static toProperCase(text: string): string {
    return text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  }
}

export default FormUtils;
