import { types as t, flow, Instance } from 'mobx-state-tree';
import uuid from 'uuid';
import md5 from 'md5';
import { stringify } from 'qs';
import { Url } from './api';

export const SubsonicServer = t
  .model('SubsonicServer', {
    url: t.maybe(t.string),
    password: t.maybe(t.string),
    username: t.maybe(t.string),
  })
  .views(self => {
    const getToken = () => {
      const s = uuid.v4();
      return { t: md5(`${self.password}${s}`), s };
    };
    return {
      params(extra = {}) {
        return stringify({
          ...getToken(),
          f: 'json',
          c: 'HedgeSonic',
          v: '1.16.1',
          ...extra,
        });
      },
    };
  })
  .actions(self => {
    const request = flow(function*(path: string) {
      try {
        const response = yield fetch(
          `${self.url}/rest${path}?${self.params()}`,
        );
        console.log('got a response', response);
        return response;
      } catch (err) {
        console.error(err);
      }
    });

    const setUrl = (url: string) => {
      self.url = url.endsWith('/') ? url.substr(0, url.length - 1) : url;
    };

    const setCredentials = (username: string, password: string) => {
      self.username = username;
      self.password = password;
    };
    const ping = flow(function*() {
      request(Url.Ping);
    });

    return {
      ping,
      setUrl,
      setCredentials,
    };
  });

export type SubsonicServer = Instance<typeof SubsonicServer>;
