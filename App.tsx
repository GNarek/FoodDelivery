import {SafeAreaView, useColorScheme, StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppNavigation} from './src/AppNavigation';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <AppNavigation />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
