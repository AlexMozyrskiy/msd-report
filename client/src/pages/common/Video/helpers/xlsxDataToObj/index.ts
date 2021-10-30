import { countOfFilledRows, lastFilledRowNumber } from 'src/library/helpers/xlsx';

export const xlsxDataToObj = (xlsxData: any) => {
  const maxRowNumber = lastFilledRowNumber(xlsxData, 'A');
  console.log(maxRowNumber);
  // const returnedObj: object[] = [{}];
  // for (let key in xlsxData) {
  //   console.log(key);
  // }
};
