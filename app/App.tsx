import { observer, Provider } from 'mobx-react';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useRootStore } from './hooks/useRootStore';
import { rootStore, SubsonicServer } from './models';

type Credentials = {
  url: string;
  username: string;
  password: string;
};
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
  useEffect(() => {
    subsonicStore.setServer('blit', SubsonicServer.create(credentials));
  }, []);

  const server = subsonicStore.servers.get('blit');
  console.log('server', server);

  if (!server) return null;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>{server?.url}</Text>
        <TouchableOpacity style={styles.button} onPress={server.ping} />
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
