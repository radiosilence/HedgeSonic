import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSubsonicServer } from '../../hooks';
import { ListRow } from '../ListRow';
import { Text } from '../Text';
import { spacing } from '../../theme';

type ArtistRowProps = {
  artistId: string;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: spacing[4],
  },
});

const ArtistRow = observer<ArtistRowProps>(({ artistId }) => {
  const { artists } = useSubsonicServer();

  const artist = artists.get(artistId);
  if (!artist) return null;
  return (
    <ListRow style={styles.container}>
      <FastImage style={styles.image} source={artist.imageSource} />
      <Text>{artist.name}</Text>
    </ListRow>
  );
});

export default ArtistRow;
