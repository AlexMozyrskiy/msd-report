import {
  countOfFilledRows as countOfFilledRowsFunction,
  lastFilledRowNumber as lastFilledRowNumberFunction,
} from 'src/library/helpers/xlsx';

class FileValidator {
  isCorrectFileType(type: string | undefined) {
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

  /**
   * Возвращает названия пустых не заполненных ячеек в указанной колонке перебираем ячейки столько раз сколько ячеек в колонке А
   *
   * @param {Object} parsedObject - объект парс excel файла с помощью библиотеки XLSX
   * @param {String} columnLetter - литер колонки например "A"
   * @returns {string[] | []}
   */
  emptyCellsInColumnLoopCountColumnA(parsedObject: any, columnLetter: string): string[] {
    let emptyCellsInColumnLoopCountColumnA: string[] = [];
    const lastFilledRowNumber = lastFilledRowNumberFunction(parsedObject, 'A');

    for (let num = 2; num <= lastFilledRowNumber; num++) {
      if (!parsedObject[`${columnLetter}${num}`]) {
        emptyCellsInColumnLoopCountColumnA.push(`${columnLetter}${num}`);
      }
    }

    return emptyCellsInColumnLoopCountColumnA;
  }

  /* Валидация Листа "Данные" */
  sheetData(parsedObject: any): string[] {
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

  /**
   * Метод анализирует ячейки в определенном стобце сверяя их тип с переданным в параметрах type
   *
   * @param {string} type - тип проверяемых ячеек
   * @param parsedObject
   * @param columnLetter
   * @returns
   */
  allCellsInColumnMustBeTypeOf(type: string, parsedObject: any, columnLetter: string) {
    let returnedArr: string[] = [];

    const lastFilledRowNumber = lastFilledRowNumberFunction(parsedObject, columnLetter);

    for (let num = 2; num <= lastFilledRowNumber; num++) {
      if (typeof parsedObject[`${columnLetter}${num}`].v !== type) {
        returnedArr.push(`${columnLetter}${num}`);
      }
    }

    return returnedArr;
  }

  /**
   * Метод анализирует ячейки в определенном стобце сверяя их значение с переданным в параметрах value
   *
   * @param {any[]} value - значение проверяемых ячеек
   * @param parsedObject
   * @param columnLetter
   * @returns
   */
  allCellsInColumnMustHaveValue(value: any[], parsedObject: any, columnLetter: string) {
    let returnedArr: string[] = [];

    const lastFilledRowNumber = lastFilledRowNumberFunction(parsedObject, columnLetter);

    for (let num = 2; num <= lastFilledRowNumber; num++) {
      if (!value.includes(parsedObject[`${columnLetter}${num}`].v)) {
        returnedArr.push(`${columnLetter}${num}`);
      }
    }

    return returnedArr;
  }

  /**
   * Проверяем все колонки на соответствие требуемым типам в листа "Отступления"
   *
   * @param parsedObject
   */
  sheetRetreatsCellsTypes(parsedObject: any) {
    let returnedArr: string[] = [];

    let wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', parsedObject, 'A');
    returnedArr.concat(wrongTypeCells);

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', parsedObject, 'B');
    returnedArr.concat(wrongTypeCells);

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('string', parsedObject, 'C');
    returnedArr.concat(wrongTypeCells);

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', parsedObject, 'E');
    returnedArr.concat(wrongTypeCells);

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', parsedObject, 'F');
    returnedArr.concat(wrongTypeCells);

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', parsedObject, 'G');
    returnedArr.concat(wrongTypeCells);

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', parsedObject, 'H');
    returnedArr.concat(wrongTypeCells);

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('string', parsedObject, 'I');
    returnedArr.concat(wrongTypeCells);

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', parsedObject, 'N');
    returnedArr.concat(wrongTypeCells);
  }

  speed(parsedObject: any, columnLetter: string) {
    let returnedArr: string[] = [];

    const lastFilledRowNumber = lastFilledRowNumberFunction(parsedObject, columnLetter);

    for (let num = 2; num <= lastFilledRowNumber; num++) {
      // const splitedCellValue: Array<any> = parsedObject[`${columnLetter}${num}`].v.split('/');
      // console.log(splitedCellValue);

      if (
        parsedObject[`${columnLetter}${num}`].t !== 's' ||
        (!parsedObject[`${columnLetter}${num}`].v.includes('/') &&
          parsedObject[`${columnLetter}${num}`].v !== 'установленная')
      ) {
        returnedArr.push(`${columnLetter}${num}`);
      }
    }

    return returnedArr;
  }

  /**
   * Проверяем все нужные колонки на заполненность в листа "Отступления"
   *
   * @param parsedObject
   */
  sheetRetreatsCellsEmptyValues(parsedObject: any) {
    let returnedArr: string[] = [];

    let emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'A');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'B');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'C');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'D');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'E');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'F');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'G');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'H');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'I');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'M');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'N');
    returnedArr = [...returnedArr, ...emptyCells];

    emptyCells = this.emptyCellsInColumnLoopCountColumnA(parsedObject, 'O');
    returnedArr = [...returnedArr, ...emptyCells];

    return returnedArr;
  }
}

export default FileValidator;
