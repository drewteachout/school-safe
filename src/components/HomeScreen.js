import React, { useState, useEffect }from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

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

  function onParentsPress() {
    if (!user) {
      auth()
        .signInAnonymously()
        .then(() => {
          console.log('User signed in anonymously.')
        })
        .catch(error => {
          console.error(error);
        })
    } else if (!user.isAnonymous) {
      auth().signOut();
      signInAnonymously();
    }
    navigation.navigate('Survey');
  }

  function onAdminPress() {
    if (!user || !user.isAnonymous) {
      navigation.navigate('Admin');
    } else {
      navigation.navigate('SignOn');
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Parents"
        buttonStyle={styles.button}
        onPress={() => onParentsPress()}
      />
      <Button
        title="Administrators"
        type="outline"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => onAdminPress()}
      />
    </View>
  );
}