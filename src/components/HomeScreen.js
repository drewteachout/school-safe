import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import {  getQuestions, getQuestionID, getSchools, getAdminEmail } from '../utils/firebase';
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
    getSchools().then(schools => {
      let isError = true;
      schools.forEach(id => {
        if (schoolID == id) {
          isError = false;
          getQuestionID(schoolID).then(id => {
            console.log('Id: ', id)
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
        if (schoolID == '') {
          setSchoolIDErrorMessage('Please enter a School ID')
        } else {
          setSchoolIDErrorMessage('The School ID you entered does not exist. Contact school administrator for valid school ID.');
        }
      }
    })
  }

  function onAdminPress() {
    getSchools().then(schools => {
      let isError = true;
      schools.forEach(id => {
        if (schoolID == id) {
          isError = false;
          if (user && !user.isAnonymous) {
            getAdminEmail(schoolID).then(email => {
              if (email == user.email) {
                navigation.navigate('Admin', { schoolID: schoolID });
              } else {
                navigation.navigate('SignOn', { schoolID: schoolID });
              }
            });
          } else {
            navigation.navigate('SignOn', { schoolID: schoolID });
          }
        }
      });
      if (isError) {
        if (schoolID == '') {
          setSchoolIDErrorMessage('Please enter a School ID')
        } else {
          setSchoolIDErrorMessage('The School ID you entered does not exist. Contact school administrator for valid school ID.');
        }
      }
    });
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