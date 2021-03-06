import { IValue } from './fields/ObjectItemField';

export const getFormItemShow = (name: string) => {
  const configs = name.split('.');
  const parentConfig = configs.length > 1 ? configs[0] : '';
  return {
    parentConfig,
  };
};

export const objToArray = (v: IValue): IValue[] => Object.keys(v).map(k => ({ [k]: v[k] }));

export const arrayToObj = (arr: IValue[]): IValue =>
  arr.reduce(
    (acc, curr) => ({
      ...acc,
      ...curr,
    }),
    {},
  );
