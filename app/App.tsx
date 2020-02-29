import { observer, Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ListRow, Text, ArtistRow, ArtistList } from './components';
import { useRootStore } from './hooks/useRootStore';
import { rootStore, SubsonicServer } from './models';
import colors from './theme/colors';

type Credentials = {
  url: string;
  username: string;
  password: string;
};

// TODO: configuration will be stored securely on device and app will require biometrics/passcode
const credentials: Credentials = require('./credentials.json');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    color: colors.foreground,
    flex: 1,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
  },
});

const Inner = observer(() => {
  const { subsonicStore } = useRootStore();
  const server = subsonicStore.servers.get('blit');

  useEffect(() => {
    subsonicStore.setServer('blit', SubsonicServer.create(credentials));
  }, []);

  useEffect(() => {
    (async () => {
      if (server) {
        server.activate();
      }
    })();
  }, [server]);
  console.log('server', server);
  if (!server) return null;
  const { artists } = server;
  console.log('artists', getSnapshot(artists));
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text>{server?.url}</Text>
        <TouchableOpacity style={styles.button} onPress={artists.fetchAll} />
        <ArtistList style={styles.scrollView} />
      </SafeAreaView>
    </>
  );
});

const App = () => {
  return (
    <Provider rootStore={rootStore}>
      <Inner />
    </Provider>
  );
};

export default App;
