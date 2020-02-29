import { types as t, flow, Instance } from 'mobx-state-tree';
import { v4 } from 'uuid';
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
      const s = v4();
      return { t: md5(`${self.password}${s}`), s };
    };
    return {
      params(extra = {}) {
        return stringify({
          ...getToken(),
          // u: self.username,
          f: 'json',
          c: 'HedgeSonic',
          v: '1.16.1',
          ...extra,
        });
      },
    };
  })
  .actions(self => {
    const request = flow(function*(path: string, params = {}) {
      try {
        const uri = `${self.url}/rest${path}?${self.params(params)}`;
        console.log('requesting URI', uri);
        const response = yield fetch(uri);
        console.log('got a response', response);
        const json = yield response.json();
        return json['subsonic-response'];
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
      const data = yield request(Url.Ping);
      console.log('ping data', data);
    });

    return {
      ping,
      setUrl,
      setCredentials,
    };
  });

export type SubsonicServer = Instance<typeof SubsonicServer>;
