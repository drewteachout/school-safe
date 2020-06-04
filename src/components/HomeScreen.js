import React, { useState, useEffect }from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import { signInAnonymously, signOut, signIn } from '../utils/authentication';
import { styles } from './config';

export function HomeScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  return (
    <View style={styles.container}>
      <Button
        title="Parents"
        buttonStyle={styles.button}
        onPress={() => {
          if (!user) {
            signInAnonymously();
          } else if (!user.isAnonymous) {
            signOut();
            signInAnonymously();
          }
          navigation.navigate('Survey');
        }}
      />
      <Button
        title="Administrators"
        type="outline"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => {
          if (!user || !user.isAnonymous) {
            navigation.navigate('Admin')
          } else {
            navigation.navigate('SignOn');
          }
        }}
      />
    </View>
  );
}