import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { getQuestions, getQuestionPrompt } from '../utils/firebase';
import { toShortDate } from '../utils/util';

export function PastListScreen({ route, navigation }) {

	function toPastDetailScreen(answers, passing, questionID, submitDate) {
		getQuestions(route.params.schoolID, questionID).then(questions => {
			let responses = [];
			if (questions.length == answers.length) {
				for (let i = 0; i < questions.length; i++) {
					responses.push({ id: i, text: questions[i], checked: answers[i]})
				}
			}
			let iconColor = '#52c41a';
			let iconName = 'check';
			if (!passing) {
				iconColor = '#ff190c';
				iconName = 'error';
			}
			getQuestionPrompt(route.params.schoolID, questionID).then(prompt => {
				navigation.navigate('PastDetails', { name: route.params.name, iconColor: iconColor, iconName: iconName, submitDate: submitDate, surveyResults: responses, surveyPrompt: prompt });
			});
		});
	}

	return (
		<View>
			{
				route.params.oldResults.map((oldResult, i) => (
					<ListItem
						key={i}
						title={'Survey ' + (route.params.oldResults.length - i) + ': ' + toShortDate(oldResult.submit_date.toDate())}
						bottomDivider
						onPress={() => { toPastDetailScreen(oldResult.answers, oldResult.passing, oldResult.question_id, toShortDate(oldResult.submit_date.toDate())); }}
					/>
				))
			}
		</View>
	)
}