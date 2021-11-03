import { distancesAndRegions as distancesAndRegionsDB } from 'src/library/DB/distancesAndRegionsData';
import { msdCodes } from 'src/library/DB/msdCodes';
import { directions as directionsDB } from 'src/library/DB/directions';

import { getDirectionNameByCode, getFullDistanceNameByCode } from 'src/library/helpers/DB';
import { getUniqueValuesFromArr } from 'src/library/helpers/numbers';

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

  const distancesList = retreats.map((item) => item.distanceNumber);
  const uniqueDistanceNumbersArr = getUniqueValuesFromArr(distancesList);
  const uniqueDistanceFullNamessArr = uniqueDistanceNumbersArr.map((distanceNumber) => {
    return getFullDistanceNameByCode(distancesAndRegionsDB, distanceNumber);
  });

  const directionsList = retreats.map((item) => item.directionCode);
  const uniqueDirectionNumbersArr = getUniqueValuesFromArr(directionsList);
  const uniqueDirectionStringsArr = uniqueDirectionNumbersArr.map((directionNumber) =>
    getDirectionNameByCode(directionsDB, directionNumber)
  );

  const tracksList = retreats.map((retreat) => retreat.trackNumber);
  const uniqueTrackNumbersArr = getUniqueValuesFromArr(tracksList);

  /* ---------- Первая строчка телеграммы ----------------- */
  const uniqueDistanceNumbersStr = uniqueDistanceNumbersArr.join(',');

  const regionsNumbersArr = uniqueDistanceNumbersArr.map((item) => {
    const distanceInfoObj = distancesAndRegionsDB.find(
      (distanceAndRegion) => distanceAndRegion.distanceNumber === item
    );
    /* если не нашли ПЧ в базе вернем 0 */
    return typeof distanceInfoObj === 'undefined' ? 0 : distanceInfoObj.regionNumber;
  });
  const uniqueRegionsNumbersArr = getUniqueValuesFromArr(regionsNumbersArr);
  const uniqueRegionsNumbersStr = uniqueRegionsNumbersArr.join(',');

  // Шапка таблицы
  forXLSXAoA.push(
    [`ДИ, НЗ-РБ, ДИЗ-РБ, ДИЗтер-ДИтер-${uniqueRegionsNumbersStr}, П, РЦДМ, ДИЦУСИ, ПЧ-${uniqueDistanceNumbersStr}.`],
    ['']
  );
  forBrowserPageRenderObj.header.push(
    `ДИ, НЗ-РБ, ДИЗ-РБ, ДИЗтер-ДИтер-${uniqueRegionsNumbersStr}, П,РЦДМ, ДИЦУСИ, ПЧ-${uniqueDistanceNumbersStr}.`
  );
  /* ---------- / Первая строчка телеграммы --------------- */

  /* ---------- Вторая строчка телеграммы ----------------- */
  const msdInfo = msdCodes.find((item) => item.msdCode === data.diagnosticToolCode);

  let secondRow: string = `${data.checkDate}г. `;
  secondRow = secondRow + msdInfo?.msdNameGenitive + ' № ' + data.diagnosticToolNumber + ' ';
  secondRow = secondRow + 'проверен участок: ';
  secondRow = secondRow + data.inspectionArea + ' ';

  const uniqueTrackNumbersStr =
    uniqueTrackNumbersArr.length > 1
      ? `${uniqueTrackNumbersArr.join(', ')} пути. `
      : `${uniqueTrackNumbersArr[0]} путь. `;

  secondRow = secondRow + uniqueTrackNumbersStr;

  secondRow = secondRow + 'Проверено ';

  if (data.checedMainTracksKm) {
    secondRow = secondRow + `${data.checedMainTracksKm} км главных путей`;

    if (data.checedSideTracksKm) {
      secondRow = secondRow + ' и ';
    } else {
      secondRow = secondRow + '. ';
    }
  }

  if (data.checedSideTracksKm) {
    secondRow = secondRow + `${data.checedSideTracksKm} км станционных путей. `;
  }

  forXLSXAoA.push([secondRow], ['']);
  forBrowserPageRenderObj.body.push(secondRow);
  /* ---------- / Вторая строчка телеграммы --------------- */

  /* ---------- Третья строчка телеграммы ----------------- */
  let thirdRow: string = 'Выявлены замечания по результатам расшифровки линейного видеонаблюдения - ';
  thirdRow = thirdRow + retreats.length;
  thirdRow = thirdRow + ' шт.:';

  forXLSXAoA.push([thirdRow]);
  forBrowserPageRenderObj.body.push(thirdRow);
  /* ---------- / Третья строчка телеграммы --------------- */

  /* ---------- Четвертая и пятая строчки телеграммы ----------------- */
  let fourthRow: string;
  let fifthRow: string;

  let isNewDistanceDirectionTrack: boolean = true;

  uniqueDistanceFullNamessArr.forEach((distanceName, distanceIndex) => {
    uniqueDirectionStringsArr.forEach((directionName, directionIndex) => {
      uniqueTrackNumbersArr.forEach((trackNumber) => {
        retreats.forEach((retreat) => {
          if (
            retreat.distanceNumber === uniqueDistanceNumbersArr[distanceIndex] &&
            retreat.directionCode === uniqueDirectionNumbersArr[directionIndex] &&
            retreat.trackNumber === trackNumber
          ) {
            if (isNewDistanceDirectionTrack) {
              forXLSXAoA.push(['']);
              fourthRow = `${distanceName}, направление: ${directionName}, ${trackNumber} путь:`;
              forXLSXAoA.push([fourthRow]);
              forBrowserPageRenderObj.body.push(fourthRow);
              isNewDistanceDirectionTrack = false;
            }

            const thread: string = retreat.thread === 'обе' ? retreat.thread + ' нити' : retreat.thread + ' нить';
            // const retreatName: string =

            fifthRow = `${retreat.kilometer} км ${retreat.meter} м, ${thread}, `;
            forXLSXAoA.push([fifthRow]);
            forBrowserPageRenderObj.body.push(fifthRow);
          }
        });
        isNewDistanceDirectionTrack = true;
      });
    });
  });
  /* ---------- / Четвертая и пятая строчки телеграммы --------------- */

  returnedObj = {
    forXLSXAoA,
    forBrowserPageRenderObj,
  };

  return returnedObj;
};
