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

  missingSheets(validateSheets: string[], neededSheets: string[]): string[] {
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
   * @returns {string[]}
   */
  emptyCellsInColumn(parsedObject: any, columnLetter: string): string[] {
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
   * @returns {string[]}
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
      if (typeof parsedObject[`${columnLetter}${num}`]?.v !== type) {
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
      if (
        parsedObject[`${columnLetter}${num}`]?.t !== 's' ||
        (!parsedObject[`${columnLetter}${num}`]?.v.includes('/') &&
          parsedObject[`${columnLetter}${num}`]?.v !== 'установленная')
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

  sheetRetreatHeader(retreatSheet: any) {
    let returnedArr: string[] = [];

    if (retreatSheet.A1.v !== 'Номер по порядку') returnedArr.push('A1');
    if (retreatSheet.B1.v !== 'Код направления') returnedArr.push('B1');
    if (retreatSheet.C1.v !== 'Перегон / Станция') returnedArr.push('C1');
    if (retreatSheet.D1.v !== 'ПЧ') returnedArr.push('D1');
    if (retreatSheet.E1.v !== 'Путь') returnedArr.push('E1');
    if (retreatSheet.F1.v !== 'КМ') returnedArr.push('F1');
    if (retreatSheet.G1.v !== 'ПК') returnedArr.push('G1');
    if (retreatSheet.H1.v !== 'М') returnedArr.push('H1');
    if (retreatSheet.I1.v !== 'Нить') returnedArr.push('I1');
    if (retreatSheet.J1.v !== 'Замечание') returnedArr.push('J1');
    if (retreatSheet.K1.v !== 'Величина') returnedArr.push('K1');
    if (retreatSheet.L1.v !== 'Накладка в стыке') returnedArr.push('L1');
    if (retreatSheet.M1.v !== 'Огр. скорости') returnedArr.push('M1');
    if (retreatSheet.N1.v !== 'Уст. Скорость') returnedArr.push('N1');
    if (retreatSheet.O1.v !== 'КОД Отступления (смотри в листе “Коды отступлений”)') returnedArr.push('O1');
    if (retreatSheet.P1.v !== 'Рег') returnedArr.push('P1');
    if (retreatSheet.Q1.v !== 'Класс пути') returnedArr.push('Q1');
    if (retreatSheet.R1.v !== 'Радиус кривой') returnedArr.push('R1');
    if (retreatSheet.S1.v !== 'Подрельсовое основание дерево/бетон') returnedArr.push('S1');
    if (retreatSheet.T1.v !== 'Тип пути (зв./ бп)') returnedArr.push('T1');

    return returnedArr;
  }

  sheetDataHeader(dataSheet: any) {
    let returnedArr: string[] = [];

    if (dataSheet.A1.v !== 'Дата проезда') returnedArr.push('A1');
    if (dataSheet.B1.v !== 'Дата расшифровки') returnedArr.push('B1');
    if (dataSheet.C1.v !== 'Участок проверки') returnedArr.push('C1');
    if (dataSheet.D1.v !== 'КОД диагностического средства (справку смотри во вкладке КОДЫ диагностических средств)')
      returnedArr.push('D1');
    if (dataSheet.E1.v !== 'Номер диагностического средства') returnedArr.push('E1');
    if (dataSheet.F1.v !== 'Проверено главных путей, км') returnedArr.push('F1');
    if (dataSheet.G1.v !== 'Проверено станционных путей, км') returnedArr.push('G1');

    return returnedArr;
  }

  sheetsValidate(retreatSheet: any, dataSheet: any, SheetNames: any): string[] {
    let newErrors: string[] = [];
    /* ---------------- Валидация загруженного файла ------------------ */
    const missingSheets = this.missingSheets(SheetNames, ['Данные', 'Отступления']);
    if (missingSheets.length) {
      newErrors.push('В загруженном файле отсутствуют следуюшие листы: ' + missingSheets.join(', '));
    }

    const sheetRetreatHeader = this.sheetRetreatHeader(retreatSheet);
    if (sheetRetreatHeader.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', Заголовки столбцов не соответствуют шаблонным. Не соответствующие заголовки: " +
          sheetRetreatHeader.join(', ') +
          '. Скачайте файл-шаблон заного, это сэкономит Вам время.'
      );
    }

    const sheetDataHeader = this.sheetDataHeader(dataSheet);
    if (sheetDataHeader.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Данные', Заголовки столбцов не соответствуют шаблонным. Не соответствующие заголовки: " +
          sheetDataHeader.join(', ') +
          '. Скачайте файл-шаблон заного, это сэкономит Вам время.'
      );
    }

    const emptyCellsInColumn = this.sheetRetreatsCellsEmptyValues(retreatSheet);
    if (emptyCellsInColumn.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', все значения в колонках 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'M', 'N', 'O' должны быть заполнены. Не заполненные ячейки: " +
          emptyCellsInColumn.join(', ')
      );
    }

    const validatedSheetData = this.sheetData(dataSheet);
    if (validatedSheetData.length) {
      newErrors = newErrors.concat(validatedSheetData);
    }

    let wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', retreatSheet, 'A');
    if (wrongTypeCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', все значения в колонке 'A' должны быть числами. Ячейки с не числовыми значениями: " +
          wrongTypeCells.join(', ')
      );
    }

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', retreatSheet, 'B');
    if (wrongTypeCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', все значения в колонке 'B' должны быть числами. Ячейки с не числовыми значениями: " +
          wrongTypeCells.join(', ')
      );
    }

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', retreatSheet, 'F');
    if (wrongTypeCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', все значения в колонке 'F' должны быть числами. Ячейки с не числовыми значениями: " +
          wrongTypeCells.join(', ')
      );
    }

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', retreatSheet, 'G');
    if (wrongTypeCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', все значения в колонке 'G' должны быть числами. Ячейки с не числовыми значениями: " +
          wrongTypeCells.join(', ')
      );
    }

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', retreatSheet, 'H');
    if (wrongTypeCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', все значения в колонке 'H' должны быть числами. Ячейки с не числовыми значениями: " +
          wrongTypeCells.join(', ')
      );
    }

    wrongTypeCells = this.allCellsInColumnMustBeTypeOf('number', retreatSheet, 'O');
    if (wrongTypeCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', все значения в колонке 'O' должны быть числами. Ячейки с не числовыми значениями: " +
          wrongTypeCells.join(', ')
      );
    }

    let wrongValueCells = this.allCellsInColumnMustHaveValue(['левая', 'правая', 'обе'], retreatSheet, 'I');
    if (wrongValueCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', значение в колонке 'I' может быть только одним из: 'левая', 'правая', 'обе'. Ячейки с не подходящими значениями: " +
          wrongValueCells.join(', ')
      );
    }

    let wrongSpeedValueCells = this.speed(retreatSheet, 'M');
    if (wrongSpeedValueCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', значения в колонке 'M' должны быть например: '100/80'. Ячейки с не подходящими значениями: " +
          wrongSpeedValueCells.join(', ')
      );
    }

    wrongSpeedValueCells = this.speed(retreatSheet, 'N');
    if (wrongSpeedValueCells.length) {
      newErrors.push(
        "В загруженном файле, в листе 'Отступления', значения в колонке 'N' должны быть например: '100/80'. Ячейки с не подходящими значениями: " +
          wrongSpeedValueCells.join(', ')
      );
    }

    return newErrors;
    /* ---------------- / Валидация загруженного файла ------------------ */
  }
}

export default FileValidator;
