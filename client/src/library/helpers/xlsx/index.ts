/**
 * Считает количество заполненных ячеек в указаннгой колонке колонке файла excel
 *
 * @param {Object} parsedObject - объект парс excel файла с помощью библиотеки XLSX
 * @param {String} columnLetter - литер колонки например "A"
 * @returns {number}
 */
export const countOfFilledRows = (parsedObject: any, columnLetter: string) => {
  let counter = 0;

  Object.keys(parsedObject).forEach((item) => {
    if (item.substr(0, columnLetter.length) === columnLetter) {
      counter++;
    }
  });

  return counter;
};

/**
 * Возвращает индекс (номер строки) посленей заполненной ячейки в указанной колонке
 *
 * @param {Object} parsedObject - объект парс excel файла с помощью библиотеки XLSX
 * @param {String} columnLetter - литер колонки например "A"
 * @returns {number}
 */
export const lastFilledRowNumber = (parsedObject: any, columnLetter: string) => {
  let currentLastFilledRowNumber: number = 0;

  Object.keys(parsedObject).forEach((item) => {
    if (item.substr(0, columnLetter.length) === columnLetter) {
      const itemNumber = +item.substr(columnLetter.length, item.length);
      if (itemNumber > currentLastFilledRowNumber) {
        currentLastFilledRowNumber = itemNumber;
      }
    }
  });

  return currentLastFilledRowNumber;
};
