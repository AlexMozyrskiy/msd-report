// Название, номера дистанций, названия номера регионов по каждому ПЧ
export interface IDistanceAndRegion {
  distanceNumber: number;
  distanceName: string;
  distancePartAndNumber: string;
  distanceFullName: string;
  regionNumber: number;
  regionTitle: string;
}

export const distancesAndRegions: IDistanceAndRegion[] = [
  {
    distanceNumber: 1,
    distanceName: 'Шахтинская дистанция пути',
    distancePartAndNumber: 'ПЧ-1',
    distanceFullName: 'ПЧ-1 Шахтинская дистанция пути',
    regionNumber: 1,
    regionTitle: 'Ростовский',
  },
  {
    distanceNumber: 2,
    distanceName: 'Таганрогская дистанция инфраструктуры',
    distancePartAndNumber: 'ИЧ-2',
    distanceFullName: 'ИЧ-2 Таганрогская дистанция инфраструктуры',
    regionNumber: 1,
    regionTitle: 'Ростовский',
  },
  {
    distanceNumber: 3,
    distanceName: 'Ростовская дистанция пути',
    distancePartAndNumber: 'ПЧ-3',
    distanceFullName: 'ПЧ-3 Ростовская дистанция пути',
    regionNumber: 1,
    regionTitle: 'Ростовский',
  },
  {
    distanceNumber: 4,
    distanceName: 'Батайская дистанция пути',
    distancePartAndNumber: 'ПЧ-4',
    distanceFullName: 'ПЧ-4 Батайская дистанция пути',
    regionNumber: 1,
    regionTitle: 'Ростовский',
  },
  {
    distanceNumber: 6,
    distanceName: 'Тихорецкая дистанция пути',
    distancePartAndNumber: 'ПЧ-6',
    distanceFullName: 'ПЧ-6 Тихорецкая дистанция пути',
    regionNumber: 2,
    regionTitle: 'Краснодарский',
  },
  {
    distanceNumber: 7,
    distanceName: 'Кавказская дистанция пути',
    distancePartAndNumber: 'ПЧ-7',
    distanceFullName: 'ПЧ-7 Кавказская дистанция пути',
    regionNumber: 2,
    regionTitle: 'Краснодарский',
  },
  {
    distanceNumber: 8,
    distanceName: 'Армавирская дистанция пути',
    distancePartAndNumber: 'ПЧ-8',
    distanceFullName: 'ПЧ-8 Армавирская дистанция пути',
    regionNumber: 6,
    regionTitle: 'Туапсинский',
  },
  {
    distanceNumber: 10,
    distanceName: 'Минераловодская дистанция пути',
    distancePartAndNumber: 'ПЧ-10',
    distanceFullName: 'ПЧ-10 Минераловодская дистанция пути',
    regionNumber: 3,
    regionTitle: 'Минераловодский',
  },
  {
    distanceNumber: 12,
    distanceName: 'Прохладненская дистанция пути',
    distancePartAndNumber: 'ПЧ-12',
    distanceFullName: 'ПЧ-12 Прохладненская дистанция пути',
    regionNumber: 3,
    regionTitle: 'Минераловодский',
  },
  {
    distanceNumber: 15,
    distanceName: 'Гудермесская дистанция пути',
    distancePartAndNumber: 'ПЧ-15',
    distanceFullName: 'ПЧ-15 Гудермесская дистанция пути',
    regionNumber: 5,
    regionTitle: 'Грозненский',
  },
  {
    distanceNumber: 16,
    distanceName: 'Махачкалинская дистанция пути',
    distancePartAndNumber: 'ПЧ-16',
    distanceFullName: 'ПЧ-16 Махачкалинская дистанция пути',
    regionNumber: 4,
    regionTitle: 'Махачкалинский',
  },
  {
    distanceNumber: 18,
    distanceName: 'Белореченская дистанция пути',
    distancePartAndNumber: 'ПЧ-18',
    distanceFullName: 'ПЧ-18 Белореченская дистанция пути',
    regionNumber: 6,
    regionTitle: 'Туапсинский',
  },
  {
    distanceNumber: 19,
    distanceName: 'Туапсинская дистанция пути',
    distancePartAndNumber: 'ПЧ-19',
    distanceFullName: 'ПЧ-19 Туапсинская дистанция пути',
    regionNumber: 6,
    regionTitle: 'Туапсинский',
  },
  {
    distanceNumber: 20,
    distanceName: 'Сочинская дистанция инфраструктуры',
    distancePartAndNumber: 'ИЧ-1',
    distanceFullName: 'ИЧ-1 Сочинская дистанция инфраструктуры',
    regionNumber: 6,
    regionTitle: 'Туапсинский',
  },
  {
    distanceNumber: 21,
    distanceName: 'Краснодарская дистанция пути',
    distancePartAndNumber: 'ПЧ-21',
    distanceFullName: 'ПЧ-21 Краснодарская дистанция пути',
    regionNumber: 2,
    regionTitle: 'Краснодарский',
  },
  {
    distanceNumber: 22,
    distanceName: 'Новороссийская дистанция пути',
    distancePartAndNumber: 'ПЧ-22',
    distanceFullName: 'ПЧ-22 Новороссийская дистанция пути',
    regionNumber: 2,
    regionTitle: 'Краснодарский',
  },
  {
    distanceNumber: 23,
    distanceName: 'Старотиторовская дистанция пути',
    distancePartAndNumber: 'ПЧ-23',
    distanceFullName: 'ПЧ-23 Старотиторовская дистанция пути',
    regionNumber: 2,
    regionTitle: 'Краснодарский',
  },
  {
    distanceNumber: 24,
    distanceName: 'Тимашевская дистанция пути',
    distancePartAndNumber: 'ПЧ-24',
    distanceFullName: 'ПЧ-24 Тимашевская дистанция пути',
    regionNumber: 2,
    regionTitle: 'Краснодарский',
  },
  {
    distanceNumber: 26,
    distanceName: 'Сальская дистанция пути',
    distancePartAndNumber: 'ПЧ-26',
    distanceFullName: 'ПЧ-26 Сальская дистанция пути',
    regionNumber: 1,
    regionTitle: 'Ростовский',
  },
  {
    distanceNumber: 27,
    distanceName: 'Куберлевская дистанция пути',
    distancePartAndNumber: 'ПЧ-27',
    distanceFullName: 'ПЧ-27 Куберлевская дистанция пути',
    regionNumber: 1,
    regionTitle: 'Ростовский',
  },
  {
    distanceNumber: 30,
    distanceName: 'Кизлярская дистанция пути',
    distancePartAndNumber: 'ПЧ-30',
    distanceFullName: 'ПЧ-30 Кизлярская дистанция пути',
    regionNumber: 4,
    regionTitle: 'Махачкалинский',
  },
  {
    distanceNumber: 32,
    distanceName: 'Горячеключевская дистанция пути',
    distancePartAndNumber: 'ПЧ-32',
    distanceFullName: 'ПЧ-32 Горячеключевская дистанция пути',
    regionNumber: 6,
    regionTitle: 'Туапсинский',
  },
  {
    distanceNumber: 33,
    distanceName: 'Лиховская дистанция пути',
    distancePartAndNumber: 'ПЧ-33',
    distanceFullName: 'ПЧ-33 Лиховская дистанция пути',
    regionNumber: 1,
    regionTitle: 'Ростовский',
  },
  {
    distanceNumber: 35,
    distanceName: 'Миллеровская дистанция пути',
    distancePartAndNumber: 'ПЧ-35',
    distanceFullName: 'ПЧ-35 Миллеровская дистанция пути',
    regionNumber: 1,
    regionTitle: 'Ростовский',
  },
  {
    distanceNumber: 28,
    distanceName: 'Ставропольская дистанция инфраструктуры',
    distancePartAndNumber: 'ИЧ-3',
    distanceFullName: 'ИЧ-3 Ставропольская дистанция инфраструктуры',
    regionNumber: 3,
    regionTitle: 'Минераловодский',
  },
  {
    distanceNumber: 29,
    distanceName: 'Ставропольская дистанция инфраструктуры',
    distancePartAndNumber: 'ИЧ-3',
    distanceFullName: 'ИЧ-3 Ставропольская дистанция инфраструктуры',
    regionNumber: 3,
    regionTitle: 'Минераловодский',
  },
];
