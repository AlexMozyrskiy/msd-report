import { distancesAndRegions } from 'src/library/DB/distancesAndRegionsData';
import { getUniqueNumbersFromArr } from 'src/library/helpers/numbers';
import { msdCodes } from 'src/library/DB/msdCodes';

import { IData, IRetreat } from 'src/state/redux/features/video/actionCreators';

export const mainTelegram = (data: IData, retreats: IRetreat[]) => {
  // возвращаемый объект, тут будет 1 массив и 1 объект:
  // 1 массив - массив массивов для формирования книги excel с помощью библиотеки XLSX;
  // 2 объект - объект для отрисовки таблицы на странице в браузере, состоит из 2 свойств:
  // 1 свойство - массив из элемнтов для создания header`а таблицы,
  // 2 свойство массив массивов с данными для создания тела таблицы.
  let returnedObj = {};

  // массив массивов для формирования книги excel с помощью библиотеки XLSX;
  let forXLSXAoA: string[][] = [];

  // объект для отрисовки таблицы на странице в браузере, состоит из 2 свойств:
  let forBrowserPageRenderObj: { header: string[]; body: string[] } = {
    header: [], // 1 свойство - массив из элемнтов для создания header`а тбалица,
    body: [], // 2 свойство массив массивов с данными для создания тела таблицы.
  };

  const distancesList = retreats.map((item) => {
    return item.distanceNumber;
  });

  /* ---------- Первая строчка телеграммы ----------------- */
  const uniqueDistanceNumbersArr = getUniqueNumbersFromArr(distancesList);
  const uniqueDistanceNumbersStr = uniqueDistanceNumbersArr.join(',');

  const regionsNumbersArr = uniqueDistanceNumbersArr.map((item) => {
    const distanceInfoObj = distancesAndRegions.find((distanceAndRegion) => distanceAndRegion.distanceNumber === item);
    /* если не нашли ПЧ в базе вернем 0 */
    return typeof distanceInfoObj === 'undefined' ? 0 : distanceInfoObj.regionNumber;
  });
  const uniqueRegionsNumbersArr = getUniqueNumbersFromArr(regionsNumbersArr);
  const uniqueRegionsNumbersStr = uniqueRegionsNumbersArr.join(',');

  // Шапка таблицы
  forXLSXAoA.push([
    `ДИ, НЗ-РБ, ДИЗ-РБ, ДИЗтер-ДИтер-${uniqueRegionsNumbersStr}, П, РЦДМ, ДИЦУСИ, ПЧ-${uniqueDistanceNumbersStr}.`,
  ]);
  forBrowserPageRenderObj.header.push(
    `ДИ, НЗ-РБ, ДИЗ-РБ, ДИЗтер-ДИтер-${uniqueRegionsNumbersStr}, П,РЦДМ, ДИЦУСИ, ПЧ-${uniqueDistanceNumbersStr}.`
  );
  /* ---------- / Первая строчка телеграммы --------------- */

  /* ---------- Вторая строчка телеграммы ----------------- */
  //   const msdName = msdCodes.find(msdCode => msdCode.msdCode === data);

  /* ---------- / Вторая строчка телеграммы --------------- */
};
