import React, {useState} from 'react';
import { ScrollView, View } from 'react-native';
import { Button, CheckBox, Divider, Input, Text, ListItem } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

import { styles, SCHOOLS, STUDENTS, SURVEY_RESULTS } from './config';

const schoolCollection = firestore().collection(SCHOOLS);

function addSurvey(state, schoolID, studentID) {
	const timeStamp = firestore.FieldValue.serverTimestamp();

	schoolCollection.doc(schoolID)
		.collection(STUDENTS)
		.doc(studentID)
		.update({
			last_submit_date: timeStamp
		});

	schoolCollection.doc(schoolID)
		.collection(STUDENTS)
		.doc(studentID)
		.collection(SURVEY_RESULTS)
		.add({
			s0: state[0].checked,
			s1: state[1].checked,
			s2: state[2].checked,
			s3: state[3].checked,
			s4: state[4].checked,
			submit_date: timeStamp
		})
		.then(() => {
			console.log('Survey recorded!')
		});
}

export function SurveyScreen({ navigation }) {
	const [state, setState] = useState([
		{ id: 0, text: 'Symptom A', checked: false },
		{ id: 1, text: 'Symptom B', checked: false },
		{ id: 2, text: 'Symptom C', checked: false },
		{ id: 3, text: 'Symptom D', checked: false },
		{ id: 4, text: 'Symptom E', checked: false }
	]);

	// TODO: Implement state for name on form
	// const [name, setName] = useState([])

	const changeState = i => {
		setState(prevState => {
			var newState =[];
			prevState.map(item => {
				if (item.id == i) {
					newState.push({ id: item.id, text: item.text, checked: !item.checked});
				} else {
					newState.push({ id: item.id, text: item.text, checked: item.checked});
				}
			})
			return newState;
		});
	}

	const onSubmit = () => {
		let finalState = {
			name: 'test',
			s0: state[0].checked,
			s1: state[1].checked,
			s2: state[2].checked,
			s3: state[3].checked,
			s4: state[4].checked
		}
		console.log('final state: ', finalState);
		addSurvey(state, '0000', '00000000');
	};

	return (
		<ScrollView>
			<View style={styles.surveyHeader}>
			<Text h1 h1Style={styles.h1Style}>Survey</Text>
			</View>
			<View>
				<Input label='School ID' />
				<Input label='Student Name' />
				<Divider style={{ backgroundColor: '#005B82'}} />
				<Text style={styles.text}>Has your child experienced any of theses symptoms in the last 14 days? Please check all that apply.</Text>
				<Divider style={{ backgroundColor: '#005B82'}} />
				{
					state.map((item, i) => (
						<CheckBox
							key={i}
							title={item.text}
							checked={item.checked}
							onPress={() => changeState(i)}
						/>
					))
				}
			</View>
			<View>
			<Button
				title="Submit"
				onPress={() => { 
					onSubmit();
					navigation.popToTop();
				}}
			/>
			</View>
		</ScrollView>
	);
}