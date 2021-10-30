class FileValidator {
  isCorrectType(type: string | undefined) {
    if (type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return false;
    } else {
      return true;
    }
  }

  missingSheets(validateSheets: string[], neededSheets: string[]): string[] | [] {
    let missingSheets: string[] = [];
    neededSheets.forEach((item) => {
      if (!validateSheets.includes(item)) {
        missingSheets.push(item);
      }
    });

    return missingSheets;
  }
}

export default FileValidator;
