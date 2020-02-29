import { types as t } from 'mobx-state-tree';

export const Album = t.model('Album', {
  id: t.identifier,
  artist: t.string,
  artistId: t.string,
  coverArt: t.string,
  created: t.string,
  duration: t.number,
  genre: t.string,
  name: t.string,
  playCount: t.number,
  songCount: t.number,
  year: t.number,
});
