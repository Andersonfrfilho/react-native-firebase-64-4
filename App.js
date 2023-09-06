/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import analytics, {firebase} from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import messaging from '@react-native-firebase/messaging';
import perf from '@react-native-firebase/perf';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  async function requestUserPermission() {
    try {
      console.log('#############');
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch (error) {
      console.log('############# - request permission');
      console.log(error);
    }
  }
  async function customTrace() {
    // Define & start a trace
    const trace = await perf().startTrace('custom_trace');

    // Define trace meta details
    trace.putAttribute('user', 'abcd');
    trace.putMetric('credits', 30);

    // Stop the trace
    await trace.stop();
  }
  useEffect(() => {
    const awesomeNewFeatureTwo = remoteConfig()
      .fetchAndActivate()
      .then(element => {
        console.log('############', element);
      });
    console.log(awesomeNewFeature);
    const awesomeNewFeature = remoteConfig().getValue('awesome_new_feature');
    console.log(awesomeNewFeature, awesomeNewFeatureTwo);
    const parameters = remoteConfig().getAll();
    Object.entries(parameters).forEach($ => {
      const [key, entry] = $;
      console.log('Key: ', key);
      console.log('Source: ', entry.getSource());
      console.log('Value: ', entry.asString());
    });
    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'enable',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        console.log(fetchedRemotely);
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.');
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });
    requestUserPermission().then(element => {
      console.log('request permission', element);
    });
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function testingFirebaseServices() {
    try {
      await firebase.analytics().setAnalyticsCollectionEnabled(true);

      await analytics().logEvent('basket', {
        id: 3745092,
        item: 'mens grey t-shirt',
        description: ['round neck', 'long sleeved'],
        size: 'L',
      });

      const appInstanceId = await analytics().getAppInstanceId();

      await analytics().logScreenView({
        screen_name: 'componentName',
        screen_class: 'componentName',
      });

      console.log(appInstanceId);
    } catch (error) {
      console.log(error);
    }
  }
  async function createAccount() {
    try {
      await auth().createUserWithEmailAndPassword(
        'andersonfrfilho@gmail.com',
        '102030',
      );
      Alert.alert('Conta', 'Cadastrado com sucesso');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <Button
          title="Add To Basket"
          onPress={() => testingFirebaseServices()}
        />
        <Button title="Add Account" onPress={() => createAccount()} />
        <Button
          title="Press me"
          // Logs in the firebase analytics console as "select_content" event
          // only accepts the two object properties which accept strings.
          onPress={async () =>
            await analytics().logSelectContent({
              content_type: 'clothing',
              item_id: 'abcd',
            })
          }
        />
        <Button title="Test Crash" onPress={() => crashlytics().crash()} />
        <Button title="Perf Trace" onPress={() => customTrace()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
