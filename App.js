/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import type {Node} from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
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
  const [webViewUrl, setWebViewUrl] = useState(null);

  const handleNavigationStateChange = navState => {
    const {url} = navState;
    console.log(
      '#############',
      url,
      url && url !== 'about:blank' && url !== webViewUrl,
    );

    if (url && url !== 'about:blank' && url !== webViewUrl) {
      // Abre links externos em um navegador externo
      Linking.openURL('com.br.smiles.hml://Home');
    }

    setWebViewUrl(url);
  };

  const htmlString = `
  <html>
    <body>
      <a href="https://example.com">Abrir exemplo</a>
    </body>
  </html>
`;

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <WebView
        // ref={webView}
        source={{html: htmlString}}
        onNavigationStateChange={handleNavigationStateChange}
      />
      <Text>asdfasdf</Text>
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
