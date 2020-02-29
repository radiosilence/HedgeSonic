import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';
import { RootStore } from '../models/root-store';

export const useStores = () => {
  return useContext(MobXProviderContext);
};

export const useRootStore = (): RootStore => useStores().rootStore;
