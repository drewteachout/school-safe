import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './config';

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