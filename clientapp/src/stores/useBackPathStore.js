import { atom, useAtom } from 'jotai';
import { atomWithLocalStorage } from './atomWithLocalStorage';
const KEY = 'back_path_version_1.0.0';
const backPathStore = atomWithLocalStorage(KEY, null);
export const useBackPathStore = () => {
  const [backPath, setBackPath] = useAtom(backPathStore);

  const reset = () => setBackPath(null);

  return {
    backPath,
    setBackPath,
    reset,
  };
};
