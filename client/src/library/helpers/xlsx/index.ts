import XLSX from 'xlsx';

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

/**
 * Функция получает данные - тип как в стейте, преобразует их в массив массивов для записи в книгу и предлагает пользователю эту книгу скачать
 *
 * @param {[[]]} data - - массив объектов - тип как в стейте,
 * @param {string} bookName - название создаваемой книги,
 * @param {string} sheetName - название создаваемого листа
 * @returns
 */
export function createAndUploadWorkBook(data: string[][], bookName: string, sheetName: string) {
  if (!Array.isArray(data)) {
    console.error('Переданные Вами данные данные в функцию creatrAndUploadWorkBook() не явлются массивом');
    return alert('Переданные Вами данные данные в функцию creatrAndUploadWorkBook() не явлются массивом');
  }

  const wb = XLSX.utils.book_new(); // созыдадим новую пустую книгу

  const ws = XLSX.utils.aoa_to_sheet(data); // создадим лист

  XLSX.utils.book_append_sheet(wb, ws, sheetName); // добавим в созданную книгу лист

  XLSX.writeFile(wb, bookName); // запишем файл xlsx и передадим его для сохранения пользователю
}
