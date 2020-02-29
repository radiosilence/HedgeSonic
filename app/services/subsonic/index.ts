import md5 from 'md5';
import { v4 } from 'uuid';
import { stringify } from 'qs';

export * from './methods';

type Config = {
  url: string;
  username: string;
  password: string;
};

let _config: Config | null = null;

const getToken = (config: Config) => {
  const s = v4();
  return { t: md5(`${config.password}${s}`), s };
};

const getParams = (config: Config, extra = {}) => {
  return stringify({
    ...getToken(config),
    u: config.username,
    f: 'json',
    c: 'HedgeSonic',
    v: '1.16.1',
    ...extra,
  });
};

export default () => ({
  request: async (path: string, params = {}) => {
    try {
      if (_config === null)
        throw new Error('Subsonic has to be initialised before use');

      const uri = `${_config.url}/rest${path}?${getParams(_config, params)}`;
      console.log('[GET]', uri);
      const response = await fetch(uri);
      // console.log('got a response', response);
      const json = await response.json();
      return json['subsonic-response'];
    } catch (err) {
      console.error(err);
    }
  },
  config: (config: Config) => {
    _config = config;
  },
});
