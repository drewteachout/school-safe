import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { screenOptions } from './src/config';
import { HomeScreen } from './src/components/HomeScreen';
import { SurveyScreen } from './src/components/SurveyScreen';
import { AdminScreen } from './src/components/AdminScreen';
import { SignOnScreen } from './src/components/SignOnScreen';
import { ListScreen } from './src/components/ListScreen';
import { DetailScreen } from './src/components/DetailScreen';
import { PastListScreen } from './src/components/PastListScreen';
import { PastDetailScreen } from './src/components/PastDetailScreen';

const Stack = createStackNavigator();

Icon.loadFont();

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Survey' component={SurveyScreen} />
          <Stack.Screen name='Admin' component={AdminScreen} />
          <Stack.Screen name='SignOn' component={SignOnScreen} />
          <Stack.Screen name='List' component={ListScreen} />
          <Stack.Screen name='Details' component={DetailScreen} />
          <Stack.Screen name='PastList' component={PastListScreen} />
          <Stack.Screen name='PastDetails' component={PastDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;