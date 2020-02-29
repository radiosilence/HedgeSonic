import { Instance, types as t } from 'mobx-state-tree';
import { Dictionary, sortBy, prop } from 'ramda';
import { Album } from './album';

export const Artist = t.model('Artist', {
  id: t.identifier,
  name: t.string,
  artistImageUrl: t.maybe(t.string),
  albumCount: t.maybe(t.number),
  album: t.maybe(t.array(t.reference(t.late(() => Album)))),
});

export type Artist = Instance<typeof Artist>;

export const ArtistStore = t
  .model('ArtistStore', {
    data: t.optional(t.map(Artist), {}),
  })
  .views(self => {
    const getSorted = () =>
      sortBy(prop('name'), Array.from(self.data.values()));

    return {
      get sorted() {
        return getSorted();
      },
    };
  })
  .actions(self => {
    const setArtists = (artists: Dictionary<Artist>) => {
      self.data.replace(artists);
    };

    return {
      setArtists,
    };
  });
