import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';

import { screenOptions } from './src/components/config';
import { HomeScreen } from './src/components/HomeScreen';
import { SurveyScreen } from './src/components/SurveyScreen';
import { AdminScreen } from './src/components/AdminScreen';
import { SignOnScreen } from './src/components/SignOnScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Survey" component={SurveyScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="SignOn" component={SignOnScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;