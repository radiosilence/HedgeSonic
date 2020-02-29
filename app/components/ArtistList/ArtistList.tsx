import React from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, ViewProps } from 'react-native';
import { ArtistRow } from '../ArtistRow';
import { useSubsonicServer } from '../../hooks';

// TODO: Use just a bunch of ids I guess
const ArtistList = observer<ViewProps>(({ ...rest }) => {
  const { artists } = useSubsonicServer();
  const artistIds = artists.sorted.map(({ id }) => id);
  return (
    <FlatList
      data={artistIds}
      renderItem={({ item }) => <ArtistRow key={item} artistId={item} />}
      {...rest}
    />
  );
});

export default ArtistList;
