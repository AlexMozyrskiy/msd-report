import { FC, Dispatch, SetStateAction, ChangeEvent, useRef } from 'react';
import SVG from 'react-inlinesvg';
import XLSX from 'xlsx';

import FileValidator from '../../../../helpers/uploadFileValidation';
import { xlsxDataToObj } from '../../../../helpers/xlsxDataToObj';

import uploadIcon from 'src/library/icons/common/upload.svg';

import st from './index.module.scss';

interface IUploadButton {
  uploadedFileValidationErrors: string[];
  setUploadedFileValidationErrors: Dispatch<SetStateAction<string[]>>;
}

const UploadButton: FC<IUploadButton> = ({ uploadedFileValidationErrors, setUploadedFileValidationErrors }) => {
  const inputRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
  // console.log(inputRef.current?.files);
  // ------------------------------------ Declare функцию вызывающуюся при загрузке файла ------------------------------------------------
  const onBookSelect = (e: ChangeEvent<HTMLInputElement>) => {
    // let inputValue = ((document.getElementById('input') as HTMLInputElement).value = '');
    // console.log(inputValue);
    // console.log(inputRef.current?.files);

    let newErrors: string[] = [];

    /* Обнуление ощибок при попытке вновь загрузить файл */
    if (uploadedFileValidationErrors.length) {
      setUploadedFileValidationErrors([]);
      newErrors = [];
    }

    const selectedFile = e.target.files?.length ? e.target.files[0] : null;

    const fileValidator = new FileValidator();
    if (!fileValidator.isCorrectType(selectedFile?.type)) {
      newErrors = ['Загруженный файл не является файлом Excel'];
      setUploadedFileValidationErrors(['Загруженный файл не является файлом Excel']);
      return;
    } else {
    }
    // let workBookData; // возвращаем json

    if (selectedFile) {
      // если файл был выбран. Эта проверка на тот случай, если пользователь нажал кнопку выбрать файл а потом закрыл окно с выбором файла не выбрав его
      let reader = new FileReader();
      reader.readAsBinaryString(selectedFile);
      reader.onload = function (event: ProgressEvent<FileReader>) {
        const data = event.target?.result;
        const workBook = XLSX.read(data, {
          type: 'binary',
        });

        /* ---------------- Валидация загруженного файла ------------------ */
        const missingSheets = fileValidator.missingSheets(workBook.SheetNames, ['Данные', 'Отступления']);
        if (missingSheets.length) {
          newErrors.push('В загруженном файле отсутствуют следуюшие листы: ' + missingSheets.join(', '));
          setUploadedFileValidationErrors(newErrors);
          return;
        }

        const emptyCellsInColumn = fileValidator.emptyCellsInColumn(workBook.Sheets['Отступления'], 'A');
        if (emptyCellsInColumn.length) {
          newErrors.push(
            "В загруженном файле, в листе 'Отступления', не заполнены ячейки: " + emptyCellsInColumn.join(', ')
          );
          setUploadedFileValidationErrors(newErrors);
          return;
        }

        const validatedSheetData = fileValidator.sheetData(workBook.Sheets['Данные']);
        if (validatedSheetData.length) {
          newErrors = newErrors.concat(validatedSheetData);
          setUploadedFileValidationErrors(newErrors);
          return;
        }

        /* ---------------- / Валидация загруженного файла ------------------ */

        //     const workSheetOtstDataObj = workBook.Sheets['Отступления'];
        //     const workSheetOtstDataJson = XLSX.utils.sheet_to_json(workSheetOtstDataObj);
        //     const workSheetOcKmDataObj = workBook.Sheets['Оценка КМ'];
        //     const workSheetOcKmDataJson = XLSX.utils.sheet_to_json(workSheetOcKmDataObj);
        //     workBookData = {
        //       otstSheetData: workSheetOtstDataJson,
        //       ocKmSheetData: workSheetOcKmDataJson,
        //     };
        //     dispatch(setWorkBookDataThunkCreator(workBookData));
        //   };
        reader.onerror = function (event) {
          // workBookData = null;
          // console.error('Файл не может быть прочитан. Код ошибки: ' + event.target.error.code);
        };
      };
    }

    /* это действие проихводим для того чтобы при повторной загрузке того же файла пользлвателем событие onChange срабатывало */
    (document.getElementById('input') as HTMLInputElement).value = '';
  };
  // ------------------------------------ / Declare функцию вызывающуюся при загрузке файла ----------------------------------------------

  return (
    <button className={st.input__wrapper}>
      <input className={st.input} id='input' type='file' onChange={onBookSelect} ref={inputRef} />
      <label htmlFor='input' className={st.input__button}>
        <figure>
          <SVG src={uploadIcon} />
        </figure>
        <p>Загрузить файл-шаблон</p>
      </label>
    </button>
  );
};

export default UploadButton;
