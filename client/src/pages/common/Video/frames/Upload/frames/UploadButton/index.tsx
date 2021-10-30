import { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';
import SVG from 'react-inlinesvg';

import FileValidator from '../../../../helpers/uploadFileValidation';

import uploadIcon from 'src/library/icons/common/upload.svg';

import st from './index.module.scss';

interface IUploadButton {
  uploadedFileValidationErrors: string[];
  setUploadedFileValidationErrors: Dispatch<SetStateAction<string[]>>;
}

const UploadButton: FC<IUploadButton> = ({ uploadedFileValidationErrors, setUploadedFileValidationErrors }) => {
  // ------------------------------------ Declare функцию вызывающуюся при загрузке файла ------------------------------------------------
  const onBookSelect = (e: ChangeEvent<HTMLInputElement>) => {
    /* Обнуление ощибок при попытке вновь загрузить файл */
    uploadedFileValidationErrors.length && setUploadedFileValidationErrors([]);

    const selectedFile = e.target.files?.length ? e.target.files[0] : null;

    const fileValidator = new FileValidator();

    if (!fileValidator.isCorrectType(selectedFile?.type)) {
      setUploadedFileValidationErrors(['Загруженный файл не является файлом Excel']);
    } else {
    }
    let workBookData; // возвращаем json
    // const selectedFile = e.target.files[0]; // выбранный в браузере файл, один, так как запрещен мульти выбор файлов

    // if (selectedFile) {
    //   // если файл был выбран. эта проверка чтобы если пользователь нажал кнопку выбрать файл а потом закрыл окно с выбором файла не выбрав его
    //   let reader = new FileReader();
    //   reader.readAsBinaryString(selectedFile);
    //   reader.onload = function (event) {
    //     const data = event.target.result;
    //     const workBook = XLSX.read(data, {
    //       type: 'binary',
    //     });

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

    //   reader.onerror = function (event) {
    //     workBookData = null;
    //     console.error('Файл не может быть прочитан. Код ошибки: ' + event.target.error.code);
    //   };
    // }
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
