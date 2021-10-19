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
}

export default Validate;
