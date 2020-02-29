import { reduce, keys, indexBy, prop, Dictionary } from 'ramda';

export const extractMapFromIndex = <T extends { id: string }>(
  subkey: string,
  indexItems: any[],
): Dictionary<T> => {
  console.log('indexItems', indexItems);
  return reduce(
    (acc, item: any) => ({
      ...acc,
      ...indexBy(prop('id'), item[subkey]),
    }),
    {},
    indexItems,
  );
};
