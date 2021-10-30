import {
  countOfFilledRows as countOfFilledRowsFunction,
  lastFilledRowNumber as lastFilledRowNumberFunction,
} from 'src/library/helpers/xlsx';

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

  /**
   * Возвращает названия пустых не заполненных пропущенных ячеек в указанной колнке
   *
   * @param {Object} parsedObject - объект парс excel файла с помощью библиотеки XLSX
   * @param {String} columnLetter - литер колонки например "A"
   * @returns {string[] | []}
   */
  emptyCellsInColumn(parsedObject: any, columnLetter: string): string[] | [] {
    let emptyCellsInColumn: string[] = [];
    const countOfFilledRows = countOfFilledRowsFunction(parsedObject, columnLetter);
    const lastFilledRowNumber = lastFilledRowNumberFunction(parsedObject, columnLetter);

    if (countOfFilledRows !== lastFilledRowNumber) {
      for (let num = 1; num <= lastFilledRowNumber; num++) {
        if (!parsedObject[`${columnLetter}${num}`]) {
          emptyCellsInColumn.push(`${columnLetter}${num}`);
        }
      }
    }

    return emptyCellsInColumn;
  }
}

export default FileValidator;
