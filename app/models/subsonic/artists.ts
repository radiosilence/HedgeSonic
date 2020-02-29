import { flow, Instance, types as t } from 'mobx-state-tree';
import { Dictionary, prop, sortBy } from 'ramda';
import { FastImageSource } from 'react-native-fast-image';
import subsonic, { Method } from '../../services/subsonic';
import { Album } from './album';
import { extractMapFromIndex } from './utils';

export const Artist = t
  .model('Artist', {
    id: t.identifier,
    name: t.string,
    artistImageUrl: t.maybe(t.string),
    albumCount: t.maybe(t.number),
    album: t.maybe(t.array(t.reference(t.late(() => Album)))),
  })
  .views(self => ({
    get imageSource(): FastImageSource {
      return {
        uri: self.artistImageUrl,
      };
    },
  }));

export type Artist = Instance<typeof Artist>;

export const ArtistStore = t
  .model('ArtistStore', {
    data: t.optional(t.map(Artist), {}),
    loading: t.optional(t.boolean, false),
  })
  .views(self => {
    const getSorted = () =>
      sortBy(prop('name'), Array.from(self.data.values()));

    return {
      get(artistId: string) {
        return self.data.get(artistId);
      },
      get sorted() {
        return getSorted();
      },
    };
  })
  .actions(self => {
    const { request } = subsonic();
    const fetchAll = flow(function*() {
      self.loading = true;
      try {
        const data = yield request(Method.GetArtists);
        console.log('<< artists', data.artists);
        self.data.replace(extractMapFromIndex('artist', data.artists.index));
      } catch (err) {
        console.error(err);
      } finally {
        self.loading = false;
      }
    });

    const setArtists = (artists: Dictionary<Artist>) => {
      self.data.replace(artists);
    };

    return {
      fetchAll,
      setArtists,
    };
  });
