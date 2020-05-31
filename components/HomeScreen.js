import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './config';

import { Button } from 'react-native-elements';

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen Export Works!</Text>
      <Button
        title="Parents"
        onPress={() => navigation.navigate('Survey')}
      />
      <Button
        title="Administrators"
        onPress={() => navigation.navigate('Admin')}
      />
    </View>
  );
}