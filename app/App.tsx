import { observer, Provider } from 'mobx-react';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRootStore } from './hooks/useRootStore';
import { rootStore, SubsonicServer } from './models';
import { getSnapshot } from 'mobx-state-tree';

type Credentials = {
  url: string;
  username: string;
  password: string;
};

// TODO: configuration will be stored securely on device and app will require biometrics/passcode
const credentials: Credentials = require('./credentials.json');

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
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
        const { artists } = server;
        await server.getMusicFolders();
        await artists.fetchAll();
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
      <SafeAreaView>
        <Text>{server?.url}</Text>
        <TouchableOpacity style={styles.button} onPress={server.ping} />
        <ScrollView>
          {artists.loading && <ActivityIndicator />}
          {artists.sorted.map(artist => (
            <Text key={artist.id}>{artist.name}</Text>
          ))}
        </ScrollView>
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
