// Название, номера дистанций, названия номера регионов по каждому ПЧ
export interface IRetreatVideoCodes {
  retreatCode: number;
  retreatForReportTamlesTitle: string;
  retreatFullTitle: string;
}

export const retreatVideoCodes: IRetreatVideoCodes[] = [
  {
    retreatCode: 1,
    retreatForReportTamlesTitle: 'зазор правый',
    retreatFullTitle: 'Превышение конструктивной величины зазора по правой рельсовой нити',
  },
  {
    retreatCode: 2,
    retreatForReportTamlesTitle: 'зазор левый',
    retreatFullTitle: 'Превышение конструктивной величины зазора по левой рельсовой нити',
  },
  {
    retreatCode: 3,
    retreatForReportTamlesTitle: 'зазор правый',
    retreatFullTitle: 'Превышение конструктивной величины зазора по правой рельсовой нити',
  },
  {
    retreatCode: 4,
    retreatForReportTamlesTitle: 'зазор левый',
    retreatFullTitle: 'Превышение конструктивной величины зазора по левой рельсовой нити',
  },
  {
    retreatCode: 5,
    retreatForReportTamlesTitle: 'отсутствует закладной болт',
    retreatFullTitle: 'Отсутствует закладной болт',
  },
  {
    retreatCode: 6,
    retreatForReportTamlesTitle: 'отсутствует клеммный болт',
    retreatFullTitle: 'Отсутствует клеммный болт',
  },
  {
    retreatCode: 7,
    retreatForReportTamlesTitle: 'подвижка',
    retreatFullTitle: 'Смещение контрольных сечений на маячных шпалах',
  },
  { retreatCode: 8, retreatForReportTamlesTitle: 'отсутствует клемма', retreatFullTitle: 'Отсутствует клемма' },
  { retreatCode: 9, retreatForReportTamlesTitle: 'выплеск', retreatFullTitle: 'Выплеск балласта' },
  { retreatCode: 10, retreatForReportTamlesTitle: 'отсутствуюут костыли', retreatFullTitle: 'Отсутствуюут костыли' },
  {
    retreatCode: 11,
    retreatForReportTamlesTitle: 'отсутствует скрепление',
    retreatFullTitle: 'Отсутствует скрепление',
  },
  {
    retreatCode: 12,
    retreatForReportTamlesTitle: 'отсутствует скоба упорная скрепления ЖБР',
    retreatFullTitle: 'Отсутствует скоба упорная скрепления ЖБР',
  },
  {
    retreatCode: 13,
    retreatForReportTamlesTitle: 'отсутствует прокладка упругая скрепления ЖБР',
    retreatFullTitle: 'Отсутствует прокладка упругая скрепления ЖБР',
  },
  {
    retreatCode: 14,
    retreatForReportTamlesTitle: 'клемма под подошвой рельса',
    retreatFullTitle: 'Клемма под подошвой рельса',
  },
  {
    retreatCode: 15,
    retreatForReportTamlesTitle: 'отсутствует один стыковой болт с одной стороны рельса в четырех дырной накладке',
    retreatFullTitle: 'Отсутствует один стыковой болт с одной сторонырельса в четырех дырной накладке',
  },
  {
    retreatCode: 16,
    retreatForReportTamlesTitle: 'отсутствуют два стыковых болта с одной стороны рельса в четырех дырной накладке',
    retreatFullTitle: 'Отсутствуют два стыковых болта с одной стороны рельса в четырех дырной накладке',
  },
  {
    retreatCode: 17,
    retreatForReportTamlesTitle: 'отсутствуют по одному стыковому болту с двух сторон рельса в четырех дырной накладке',
    retreatFullTitle: 'Отсутствуют по одному стыковому болту с двух сторон рельса в четырех дырной накладке',
  },
  {
    retreatCode: 18,
    retreatForReportTamlesTitle: 'отсутствуют два стыковых болта с двух сторон рельса в четырех дырной накладке',
    retreatFullTitle: 'Отсутствуют два стыковых болта с двух сторон рельса в четырех дырной накладке',
  },
  {
    retreatCode: 19,
    retreatForReportTamlesTitle: 'отсутствует один стыковой болт с одной стороны рельса в шести дырной накладке',
    retreatFullTitle: 'Отсутствует один стыковой болт с одной стороны рельса в шести дырной накладке',
  },
  {
    retreatCode: 20,
    retreatForReportTamlesTitle: 'отсутствуют по одному стыковому болту с двух сторон рельса в шести дырной накладке',
    retreatFullTitle: 'Отсутствуют по одному стыковому болту с двух сторон рельса в шести дырной накладке',
  },
  {
    retreatCode: 21,
    retreatForReportTamlesTitle: 'отсутствуют два стыковых болта с одной стороны рельса в шести дырной накладке',
    retreatFullTitle: 'Отсутствуют два стыковых болта с одной стороны рельса в шести дырной накладке',
  },
  {
    retreatCode: 22,
    retreatForReportTamlesTitle: 'отсутствуют по два стыковых болта с каждой стороны рельса в шести дырной накладке',
    retreatFullTitle: 'Отсутствуют по два стыковых болта с каждой стороны рельса в шести дырной накладке',
  },
  {
    retreatCode: 23,
    retreatForReportTamlesTitle: 'отсутствуют три стыковых болта с одной стороны рельса в шести дырной накладке',
    retreatFullTitle: 'Отсутствуют три стыковых болта с одной стороны рельса в шести дырной накладке',
  },
  {
    retreatCode: 24,
    retreatForReportTamlesTitle: 'трещина в стыковой накладке',
    retreatFullTitle: 'Трещина в стыковой накладке',
  },
  {
    retreatCode: 25,
    retreatForReportTamlesTitle: 'излом стыковой накладки',
    retreatFullTitle: 'Излом стыковой накладки',
  },
  {
    retreatCode: 26,
    retreatForReportTamlesTitle: 'вертикальная  ступенька',
    retreatFullTitle: 'Вертикальная  ступенька',
  },
  {
    retreatCode: 27,
    retreatForReportTamlesTitle: 'дефектная деревянная шпала',
    retreatFullTitle: 'Дефектная деревянная шпала',
  },
  {
    retreatCode: 28,
    retreatForReportTamlesTitle: 'негодная деревянная шпала',
    retreatFullTitle: 'Негодная деревянная шпала',
  },
  {
    retreatCode: 29,
    retreatForReportTamlesTitle: 'дефектная железобетонная шпала',
    retreatFullTitle: 'Дефектная железобетонная шпала',
  },
  {
    retreatCode: 30,
    retreatForReportTamlesTitle: 'негодная железобетонная шпала',
    retreatFullTitle: 'Негодная железобетонная шпала',
  },
  {
    retreatCode: 31,
    retreatForReportTamlesTitle: 'отклонение от эпюрных значений укладки шпал',
    retreatFullTitle: 'Отклонение от эпюрных значений укладки шпал',
  },
  { retreatCode: 32, retreatForReportTamlesTitle: 'дефектный рельс', retreatFullTitle: 'Дефектный рельс' },
  { retreatCode: 33, retreatForReportTamlesTitle: 'излом рельса', retreatFullTitle: 'Излом рельса' },
  {
    retreatCode: 34,
    retreatForReportTamlesTitle: 'поперечные или продольные трещины,изломы головки рельса',
    retreatFullTitle: 'Поперечные или продольные трещины,изломы головки рельса',
  },
  {
    retreatCode: 35,
    retreatForReportTamlesTitle: 'недостаточное количество балласта в шпальном ящике',
    retreatFullTitle: 'Недостаточное количество балласта в шпальном ящике',
  },
  {
    retreatCode: 36,
    retreatForReportTamlesTitle: 'не обновлена маркировка «маячных» шпал',
    retreatFullTitle: 'Не обновлена маркировка «маячных» шпал',
  },
  {
    retreatCode: 37,
    retreatForReportTamlesTitle: 'отсутствует разметка контрольных сечений рельсовой плети',
    retreatFullTitle: 'Отсутствует разметка контрольных сечений рельсовой плети',
  },
  {
    retreatCode: 38,
    retreatForReportTamlesTitle: 'эксплуатация четырехдырных накладок на мосту',
    retreatFullTitle: 'Эксплуатация четырехдырных накладок на мосту',
  },
  {
    retreatCode: 39,
    retreatForReportTamlesTitle: 'металлическая пластина между головкой рельса и стыковой накладкой',
    retreatFullTitle: 'Металлическая пластина между головкой рельса и стыковой накладкой',
  },
  {
    retreatCode: 40,
    retreatForReportTamlesTitle: 'нетиповые и посторонние предметы в стыке',
    retreatFullTitle: 'Нетиповые и посторонние предметы в стыке',
  },
  { retreatCode: 41, retreatForReportTamlesTitle: 'прочие', retreatFullTitle: 'Прочие' },
];
