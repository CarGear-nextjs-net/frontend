import { atom, useAtom } from 'jotai';
import { atomWithLocalStorage } from './atomWithLocalStorage';
const KEY = 'user_profile_version_1.0.0';
const userProfileStore = atomWithLocalStorage(KEY, {});
export const useUserProfileStore = () => {
  const [userStore, setUserStore] = useAtom(userProfileStore);

  const reset = () => setUserStore({});

  return {
    userStore,
    setUserStore,
    reset,
  };
};
