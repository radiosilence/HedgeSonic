import { types as t } from 'mobx-state-tree';
import { SubsonicServer } from './server';

export const SubsonicStore = t
  .model('SubsonicStore', {
    servers: t.map(SubsonicServer),
  })
  .actions(self => {
    const setServer = (id: string, server: SubsonicServer) => {
      self.servers.set(id, server);
    };

    return {
      setServer,
    };
  });
