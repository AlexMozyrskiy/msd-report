class Validate {
  isEmpty(value: string): boolean {
    if (!value) {
      return true;
    }

    return false;
  }

  isEmail(value: string): boolean {
    const dogInclude = value.includes('@');
    const dotInclude = value.includes('.');

    if (!dogInclude || !dotInclude) {
      return false;
    }

    return true;
  }

  isFieldsEqual(value1: string | number, value2: string | number) {
    if (value1 === value2) {
      return true;
    } else {
      return false;
    }
  }
}

export default Validate;
