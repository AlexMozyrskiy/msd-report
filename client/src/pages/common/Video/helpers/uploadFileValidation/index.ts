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

  /* Валидация Листа "Данные" */
  sheetData(parsedObject: any): string[] | [] {
    let returnedArr: string[] = [];

    if (!parsedObject.A2) {
      returnedArr.push("В листе 'Данные' ячейка A2 обязательна для заполнения");
    }

    if (!parsedObject.B2) {
      returnedArr.push("В листе 'Данные' ячейка B2 обязательна для заполнения");
    }

    if (!parsedObject.C2) {
      returnedArr.push("В листе 'Данные' ячейка C2 обязательна для заполнения");
    }

    if (!parsedObject.D2) {
      returnedArr.push("В листе 'Данные' ячейка D2 обязательна для заполнения");
    }

    if (!parsedObject.E2) {
      returnedArr.push("В листе 'Данные' ячейка E2 обязательна для заполнения");
    }

    if (parsedObject.A2.t !== 's') {
      returnedArr.push("В листе 'Данные' в ячейке A2 должен быть строковый тип данных");
    }

    if (parsedObject.B2.t !== 's') {
      returnedArr.push("В листе 'Данные' в ячейке B2 должен быть строковый тип данных");
    }

    if (parsedObject.C2.t !== 's') {
      returnedArr.push("В листе 'Данные' в ячейке C2 должен быть строковый тип данных");
    }

    if (parsedObject.D2.t !== 'n') {
      returnedArr.push("В листе 'Данные' в ячейке D2 должен быть числовой тип данных");
    }

    return returnedArr;
  }
}

export default FileValidator;
