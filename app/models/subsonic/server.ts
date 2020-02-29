import { flow, Instance, types as t } from 'mobx-state-tree';
import subsonic, { Method } from '../../services/subsonic';
import { Album } from './album';
import { ArtistStore, Artist } from './artists';
import { extractMapFromIndex } from './utils';

export const SubsonicServer = t
  .model('SubsonicServer', {
    url: t.maybe(t.string),
    password: t.maybe(t.string),
    username: t.maybe(t.string),
    artists: t.optional(ArtistStore, {}),
    albums: t.optional(t.map(Album), {}),
    loading: t.optional(t.boolean, false),
  })
  .actions(self => {
    const { request, config } = subsonic();

    const activate = () => {
      if (!self.url || !self.username || !self.password)
        throw new Error('Subsonic server not configured');

      config({
        url: self.url,
        username: self.username,
        password: self.password,
      });
    };

    const setUrl = (url: string) => {
      self.url = url.endsWith('/') ? url.substr(0, url.length - 1) : url;
    };

    const setCredentials = (username: string, password: string) => {
      self.username = username;
      self.password = password;
    };
    const ping = flow(function*() {
      const data = yield request(Method.Ping);
      console.log('<< ping data', data);
    });

    const getMusicFolders = flow(function*() {
      const data = yield request(Method.GetMusicFolders);
      console.log('<< music folders data', data);
    });

    const getIndexes = flow(function*(p: { musicFolderId?: string } = {}) {
      const data = yield request(Method.GetIndexes, p);
      console.log('<< indexes', data);
    });

    const getMusicDirectory = flow(function*(p: { id: string }) {
      const data = yield request(Method.GetMusicDirectory, p);
      console.log('<< music directory data', data);
    });

    return {
      ping,
      request,
      setUrl,
      activate,
      setCredentials,
      getMusicFolders,
      getIndexes,
      getMusicDirectory,
    };
  });

export type SubsonicServer = Instance<typeof SubsonicServer>;
