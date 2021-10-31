import { countOfFilledRows, lastFilledRowNumber } from 'src/library/helpers/xlsx';

export interface ISheetOtst {
  id: number;
  directionCode: number;
  stationOrLine: string;
  distanceNumber: number;
  trackNumber: string | number;
  kilometer: number;
  picket: number;
  meter: number;
  thread: string;
  retreatSize: number;
  pad: string;
  limitSpeed: string | null;
  setSpeed: string;
  retreatCode: number;
  regionNumber: number;
  trackClass: number;
  curveRadius: string | number;
  subrailBase: string;
  trackType: string;
}

export const xlsxDataToObj = (xlsxData: any): ISheetOtst[] => {
  let returnedArr: ISheetOtst[] = [];

  returnedArr = xlsxData.map((item: any) => {
    /* Спарсим номер дистанции */
    let distanceNumber = null;

    if (String(item['ПЧ']).match(/ПЧ-/g)) {
      distanceNumber = item['ПЧ'].match(/\d+/g);
    } else if (String(item['ПЧ']).match(/ИЧ-/g)) {
      if (item['ПЧ'].match(/\d+/g)[0] === '2') {
        distanceNumber = ['2'];
      } else if (item['ПЧ'].match(/\d+/g)[0] === '1') {
        distanceNumber = ['20'];
      } else if (item['ПЧ'].match(/\d+/g)[0] === '3') {
        distanceNumber = ['28'];
      }
      /* Если просто вбит номер ПЧ например в ячейке стоит просто 3 */
    } else {
      distanceNumber = [`${item['ПЧ']}`];
    }

    return {
      id: item['Номер по порядку'],
      directionCode: item['Код направления'],
      stationOrLine: item['Перегон / Станция'],
      distanceNumber: +distanceNumber[0],
      trackNumber: item['Путь'],
      kilometer: item['КМ'],
      picket: item['ПК'],
      meter: item['М'],
      thread: item['Нить'],
      retreatSize: item['Величина'],
      pad: item['Накладка в стыке'],
      limitSpeed: item['Огр. скорости'],
      setSpeed: item['Уст. Скорость'],
      retreatCode: item['КОД Отступления (смотри в листе “Коды отступлений”)'],
      regionNumber: item['Рег'],
      trackClass: item['Класс пути'],
      curveRadius: item['Радиус кривой'],
      subrailBase: item['Подрельсовое основание дерево/бетон'],
      trackType: item['Тип пути (зв./ бп)'],
    };
  });

  return returnedArr;
};
