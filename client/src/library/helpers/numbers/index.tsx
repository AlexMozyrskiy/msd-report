/* Функция принимает метр и определяет на каком он пикете */

/**
 *
 * @param {number} meter - метр
 * @returns
 */
export function definePicketByMeter(meter: number) {
  let pk; // пикет, будем возвращать из функции

  if (!Number.isFinite(meter)) {
    // если передано не число
    meter = +meter; // приведем его к числу
  }

  if (Number.isNaN(meter)) {
    // если передано (или после первого приведения к числу) NaN
    alert('в функцию определяющую пикет по метру передано не число'); // сообщение об ошибке
  }

  const meterStr = String(meter);

  if (meterStr.length === 1 || meterStr.length === 2) {
    // если количество цифр в метре 1 или 2, то пикет будет 1
    pk = 1;
  } else if (meterStr.length === 3) {
    // если количество цифр в метре равно три, например 321
    const meterFirstNumberStr = meterStr.substr(0, 1); // получим первую цифру
    const meterFirstNumberNum = Number(meterFirstNumberStr); // приведем ее к числу
    pk = meterFirstNumberNum + 1; // прибавим 1 чтобы получит пикет
  } else if (meterStr.length > 3) {
    // если количество цифр в метре более трех, например 1022
    const meterFirstNumberStr = meterStr.substr(0, 2); // получим первые 2 цифры
    const meterFirstNumberNum = Number(meterFirstNumberStr); // приведем их к числу
    pk = meterFirstNumberNum + 1; // прибавим 1 чтобы получит пикет
  }

  return pk;
}
