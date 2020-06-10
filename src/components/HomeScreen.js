import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import {  getQuestions, getQuestionID, getSchools } from '../utils/firebase';
import { styles } from './config';

export function HomeScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [schoolID, setSchoolID] = useState('');
  const [schoolIDErrorMessage, setSchoolIDErrorMessage] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  // Sign in anonymously
  if (!user) {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously.');
      })
      .catch(error => {
        console.error(error);
      })
  }

  function onParentsPress() {
    getSchools().then(schools =>{
      let isError = true;
      schools.forEach(id => {
        if (schoolID == id) {
          isError = false;
          getQuestionID(schoolID).then(id => {
            getQuestions(schoolID, id).then(questions => {
              let questionsArray = [];
              for (let i = 0; i < questions.length; i++) {
                questionsArray.push({ id: i, text: questions[i], checked: false });
              }
              // setQuestions(questionsArray);
              navigation.navigate('Survey', { questionID: id, questions: questionsArray, schoolID: schoolID });
            });
          })
        }
      });
      if (isError) {
        setSchoolIDErrorMessage('The School ID you entered does not exist. Contact school administrator for valid school ID.');
      }
    })
  }

  function onAdminPress() {
    if (!user && !user.isAnonymous) {
      navigation.navigate('Admin');
    } else {
      navigation.navigate('SignOn');
    }
  }

  return (
    <View style={styles.container}>
      <Input
          containerStyle={styles.input}
					label='School ID'
					errorMessage={schoolIDErrorMessage}
					onChangeText={schoolID => {
						setSchoolIDErrorMessage('');
						setSchoolID(schoolID);
					}}
				/>
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