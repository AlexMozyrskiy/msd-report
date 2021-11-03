import { IDirection } from 'src/library/DB/directions';
import { IDistanceAndRegion } from 'src/library/DB/distancesAndRegionsData';
import { IRetreatVideoCodes } from 'src/library/DB/retreatVideoCodes';

/* Функция вернет название направления (тип string) по переданному ей коду направления (тип number) */

export function getDirectionNameByCode(DB: IDirection[], code: number) {
  if (!Number.isFinite(code)) {
    // если передано не число
    code = +code; // приведем его к числу
  }

  if (Number.isNaN(code)) {
    // если передано (или после первого приведения к числу) NaN
    console.error('в функцию определяющую направление по коду направления передано не число'); // сообщение об ошибке
    return '';
  }

  const targetDirection = DB.find((item) => item.code === code);

  if (typeof targetDirection === 'undefined') {
    // если не нашел переданного направления
    console.error(
      'Внимание!!!!! Код направления в функции не найден, перепроверьте функцию getDirectionByCode!!!!! Переданный код направления: ' +
        code
    );
    return '';
  } else {
    // если нашел
    return targetDirection.name;
  }
}

export function getFullDistanceNameByCode(DB: IDistanceAndRegion[], code: number) {
  if (!Number.isFinite(code)) {
    // если передано не число
    code = +code; // приведем его к числу
  }

  if (Number.isNaN(code)) {
    // если передано (или после первого приведения к числу) NaN
    console.error('в функцию определяющую полное имя ПЧ по коду ПЧ передано не число'); // сообщение об ошибке
    return '';
  }

  const targetDistance = DB.find((item) => item.distanceNumber === code);

  if (typeof targetDistance === 'undefined') {
    // если не нашел переданного направления
    console.error(
      'Внимание!!!!! Код ПЧ в функции не найден, перепроверьте функцию getFullDistanceNameByCode!!!!! Переданный код ПЧ: ' +
        code
    );
    return '';
  } else {
    // если нашел
    return targetDistance.distanceFullName;
  }
}

export function getRetreatNameByCode(DB: IRetreatVideoCodes[], code: number) {
  if (!Number.isFinite(code)) {
    // если передано не число
    code = +code; // приведем его к числу
  }

  if (Number.isNaN(code)) {
    // если передано (или после первого приведения к числу) NaN
    console.error('в функцию определяющую полное название неисправности по коду передано не число'); // сообщение об ошибке
    return '';
  }

  const targetDistance = DB.find((item) => item.retreatCode === code);

  if (typeof targetDistance === 'undefined') {
    // если не нашел переданного направления
    console.error(
      'Внимание!!!!! Код отступления в функции не найден, перепроверьте функцию getRetreatNameByCode!!!!! Переданный код отступления: ' +
        code
    );
    return '';
  } else {
    // если нашел
    return targetDistance.retreatForReportTamlesTitle;
  }
}
