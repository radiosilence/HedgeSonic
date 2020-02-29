import { types, Instance } from 'mobx-state-tree';
import { SubsonicStore } from './subsonic';

export const RootStore = types.model('root', {
  subsonicStore: types.optional(SubsonicStore, {}),
});

export type RootStore = Instance<typeof RootStore>;

export const rootStore = RootStore.create({});
