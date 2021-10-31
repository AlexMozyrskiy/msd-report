import { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';
import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import XLSX from 'xlsx';

import FileValidator from '../../../../helpers/uploadFileValidation';
import { sheetDataToObj, sheetRetreatsToObj } from '../../../../helpers/xlsxDataToObj';
import { setRetreats as setRetreatsAC, setData as setDataAC } from 'src/state/redux/features/video/actionCreators';

// import { xlsxDataToObj } from '../../../../helpers/xlsxDataToObj';

import uploadIcon from 'src/library/icons/common/upload.svg';

import st from './index.module.scss';

interface IUploadButton {
  uploadedFileValidationErrors: string[];
  setUploadedFileValidationErrors: Dispatch<SetStateAction<string[]>>;
}

const UploadButton: FC<IUploadButton> = ({ uploadedFileValidationErrors, setUploadedFileValidationErrors }) => {
  const dispatch = useDispatch();
  // ------------------------------------ Declare функцию вызывающуюся при загрузке файла ------------------------------------------------
  const onBookSelect = (e: ChangeEvent<HTMLInputElement>) => {
    let validationErrors: string[] = [];

    /* Обнуление ощибок при попытке вновь загрузить файл */
    if (uploadedFileValidationErrors.length) {
      setUploadedFileValidationErrors([]);
      validationErrors = [];
    }

    const selectedFile = e.target.files?.length ? e.target.files[0] : null;

    const fileValidator = new FileValidator();
    if (!fileValidator.isCorrectFileType(selectedFile?.type)) {
      validationErrors = ['Загруженный файл не является файлом Excel'];
      setUploadedFileValidationErrors(validationErrors);
      return;
    }

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
        validationErrors = fileValidator.sheetsValidate(
          workBook.Sheets['Отступления'],
          workBook.Sheets['Данные'],
          workBook.SheetNames
        );

        if (validationErrors.length) {
          console.log(validationErrors);
          setUploadedFileValidationErrors(validationErrors);
          return;
        }
        /* ---------------- / Валидация загруженного файла ------------------ */

        const workSheetRetreats = XLSX.utils.sheet_to_json(workBook.Sheets['Отступления']);
        const workSheetRetreatsToState = sheetRetreatsToObj(workSheetRetreats);
        const workSheetData = XLSX.utils.sheet_to_json(workBook.Sheets['Данные']);
        const workSheetDataToState = sheetDataToObj(workSheetData);
        dispatch(setRetreatsAC(workSheetRetreatsToState));
        dispatch(setDataAC(workSheetDataToState));
        console.log(workSheetRetreats, workSheetDataToState);
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
      <input className={st.input} id='input' type='file' onChange={onBookSelect} />
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
