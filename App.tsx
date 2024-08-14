import {SafeAreaView, useColorScheme, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppNavigation} from './src/AppNavigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppNavigation />
    </SafeAreaView>
  );
}

export default App;
