import React from 'react';
import { View } from 'react-native';
import { styles } from './config';

import { Button } from 'react-native-elements';

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Parents"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Survey')}
      />
      <Button
        title="Administrators"
        type="outline"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate('Admin')}
      />
    </View>
  );
}