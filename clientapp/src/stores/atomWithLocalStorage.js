import { atomWithStorage } from 'jotai/utils';

export const atomWithLocalStorage = (key, initialValue) => {
  const derivedAtom = atomWithStorage(key, initialValue);

  return derivedAtom;
};
