import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { getStudentData, getQuestions } from '../utils/firebase';
import { toShortDate } from '../utils/util';

export function ListScreen({ route, navigation }) {

	function toDetailScreen(name, studentID) {
		getStudentData(route.params.schoolID, studentID).then(student => {
			getQuestions(route.params.schoolID, student.questionID).then(questions => {
				if (questions.length == student.answers.length) {
					var responses = [];
					for (let i = 0; i < questions.length; i++) {
						responses.push({ id: i, text: questions[i], checked: student.answers[i]})
					}
				}
				navigation.navigate('Details', {
					iconColor: route.params.iconColor,
					iconName: route.params.iconName,
					lastSubmitDate: toShortDate(student.lastSubmitDate.toDate()),
					name: name,
					oldResults: student.oldResults,
					schoolID: route.params.schoolID,
					studentID: studentID,
					surveyResults: responses
				});
			})
		});
	}

	return (
		<View>
			{
				route.params.students.map((student, i) => (
					<ListItem
						key={i}
						title={student.name}
						bottomDivider
						onPress={() => {
							toDetailScreen(student.name, student.id);
						}}
					/>
				))
			}
		</View>
	)
}