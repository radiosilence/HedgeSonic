import { useRootStore } from './useRootStore';
import { SubsonicServer } from '../models';

export const useSubsonicServer = (id = 'blit'): SubsonicServer => {
  const { subsonicStore } = useRootStore();
  return subsonicStore.servers.get(id) as SubsonicServer;
};
