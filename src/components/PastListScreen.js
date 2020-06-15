import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { getStudentData, getQuestions } from '../utils/firebase';
import { toShortDate } from '../utils/util';

export function PastListScreen({ route, navigation }) {

  // function toDetailScreen(name, studentID) {
  //   getStudentData(route.params.schoolID, studentID).then(student => {
  //     getQuestions(route.params.schoolID, student.questionID).then(questions => {
  //       if (questions.length == student.answers.length) {
  //         var responses = [];
  //         for (let i = 0; i < questions.length; i++) {
  //           responses.push({ id: i, text: questions[i], checked: student.answers[i]})
  //         }
  //       } else {
  //         console.error('Questions and Answers do not match up');
  //       }
  //       navigation.navigate('Details', {
  //         color: route.params.color,
  //         iconName: route.params.iconName,
  //         lastSubmitDate: toShortDate(student.lastSubmitDate.toDate()),
  //         name: name,
  //         oldResults: student.oldResults,
  //         schoolID: route.params.schoolID,
  //         studentID: studentID,
  //         surveyResults: responses
  //       });
  //     })
  //   });
  // }

  function toPastDetailScreen() {
    
  }

  return (
    <View>
      {
        route.params.oldResults.map((oldResult, i) => {
          const date = toShortDate(oldResult.submit_date.toDate());
          return <ListItem
            key={i}
            title={'Survey ' + (route.params.oldResults.length - i) + ': ' + toShortDate(oldResult.submit_date.toDate())}
            bottomDivider
            onPress={() => toPastDetailScreen()}
          />
        })
      }
    </View>
  )
}