// Название, номера дистанций, названия номера регионов по каждому ПЧ
interface ImsdCodes {
  msdCode: number;
  msdNameNominative: string;
  msdNameGenitive: string;
}

export const msdCodes: ImsdCodes[] = [
  {
    msdCode: 1,
    msdNameNominative: 'Вагон путезимеритель ПС',
    msdNameGenitive: 'Вагоном путезимерителем ПС',
  },
  {
    msdCode: 2,
    msdNameNominative: 'Вагон Дефектоскоп',
    msdNameGenitive: 'Вагоном Дефектоскопом',
  },
  {
    msdCode: 3,
    msdNameNominative: 'Диагностический вагоном ДЕКАРТ',
    msdNameGenitive: 'Диагностическим вагоном ДЕКАРТ',
  },
  {
    msdCode: 4,
    msdNameNominative: 'Диагностический комплекс АДК-И “ЭРА”',
    msdNameGenitive: 'Диагностическим комплексом АДК-И “ЭРА”',
  },
];
