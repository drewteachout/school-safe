import React, {useState} from 'react';
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { Button, CheckBox, Input, Overlay, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

import { styles, SCHOOLS, STUDENTS, SURVEY_RESULTS } from '../config';
import { nameHashCode } from '../utils/util'
import { getStudents } from '../utils/firebase';

const schoolCollection = firestore().collection(SCHOOLS);

export function SurveyScreen({ route, navigation }) {
	const [questions, setQuestions] = useState(route.params.questions);
	const [name, setName] = useState('');
	const [month, setMonth] = useState('');
	const [day, setDay] = useState('');
	const [year, setYear] = useState('');
	const [visible, setVisible] = useState(false);
	const [confirmationVisible, setConfirmationVisible] = useState(false);

	const changeState = i => {
		setQuestions(prevQuestions => {
			var newQuestions =[];
			prevQuestions.map(item => {
				if (item.id == i) {
					newQuestions.push({ id: item.id, text: item.text, checked: !item.checked});
				} else {
					newQuestions.push({ id: item.id, text: item.text, checked: item.checked});
				}
			})
			return newQuestions;
		});
	}

	function addSurvey() {
		const timeStamp = firestore.FieldValue.serverTimestamp();
		const studentID = nameHashCode(name.toLowerCase() + month + day + year).toString();
		let answersArray = [];

		getStudents(route.params.schoolID).then(students => {
			let studentExists = false;
			students.forEach(id => {
				if (id.toString() === studentID) {
					studentExists = true;
					let passing = true;
					questions.forEach(question => {
						answersArray.push(question.checked);
						if (question.id >= route.params.answerKey.length || route.params.answerKey[question.id] != question.checked) {
							passing = false;
						}
					})

					schoolCollection.doc(route.params.schoolID)
						.collection(STUDENTS)
						.doc(studentID)
						.update({
							last_submit_date: timeStamp,
							passing: passing,
						});

					schoolCollection.doc(route.params.schoolID)
						.collection(STUDENTS)
						.doc(studentID)
						.collection(SURVEY_RESULTS)
						.add({
							answers: answersArray,
							passing: passing,
							question_id: route.params.questionID,
							submit_date: timeStamp
						})
					navigation.popToTop();
				}
			});
			if (!studentExists) {
				setVisible(true);
			}
		})
	}

	return (
		<TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} accessible={false}>
			<ScrollView style={styles.root} contentContainerStyle={styles.rootContainer}>
				<View styles={styles.rowContainer}>
					<Input
						autoCapitalize='words'
						containerStyle={{ paddingTop: 25 }}
						label='Student Name'
						labelStyle={styles.inputLabel}
						onChangeText={name => {
							setName(name);
						}}
					/>
				</View>
				<View style={{ alignSelf: 'flex-start', paddingLeft: 20 }}>
					<Text h4 h4Style={styles.h4Style}>DATE OF BIRTH</Text>
				</View>
				<View style={styles.rowContainer} >
					<Input
						containerStyle={{ width: 90, paddingBottom: 0, marginBottom: 0 }}
						label='Month'
						placeholder={'mm'}
						onChangeText={month => {
							setMonth(month)
						}}
					/>
					<Input
						containerStyle={{ width: 90, paddingBottom: 0, marginBottom: 0 }}
						label='Day'
						placeholder={'dd'}
						onChangeText={day => {
							setDay(day)
						}}
					/>
					<Input
						containerStyle={{ width: 185, paddingBottom: 0, marginBottom: 0 }}
						label='Year'
						placeholder={'yyyy'}
						onChangeText={year => {
							setYear(year)
						}}
					/>
				</View>
				<View style={{ width: 350, paddingBottom: 20 }}>
					<Text style={styles.text}>{route.params.surveyPrompt}</Text>
					{
						questions.map((item, i) => (
							<CheckBox
								key={i}
								title={item.text}
								checked={item.checked}
								onPress={() => changeState(i)}
							/>
						))
					}
				</View>
				<Button
					title="Submit"
					containerStyle={{ width: 350, paddingBottom: 25 }}
					onPress={() => { setConfirmationVisible(true); }}
				/>
				<Overlay
					isVisible={visible}
					onBackdropPress={() => setVisible(false)}
					overlayStyle={{ height: 150, width: 300 }}
					>
					<View>
						<Text style={styles.text}>Student not found. Please check that Student Name 
							and Date of Birth fields are correct. If still encountering issue contact administrator.</Text>
						<Button title='Continue' style={styles.button} onPress={() => setVisible(false)}/>
					</View>
				</Overlay>
				<Overlay
					isVisible={confirmationVisible}
					onBackdropPress={() => setConfirmationVisible(false)}
					overlayStyle={{ height: 125, width: 300 }}
					>
					<View style={styles.rootContainer}>
						<Text h3 h3Style={styles.h3Style}>Please Confirm</Text>
						<Text>Is the information you entered correct?</Text>
						<View style={styles.rowContainer}>
							<Button containerStyle={styles.buttonContainer} title='Cancel' type='outline' onPress={() => setConfirmationVisible(false)}></Button>
							<Button containerStyle={styles.buttonContainer} title='Submit' type='solid' onPress={() => {addSurvey(); setConfirmationVisible(false)}}></Button>
						</View>
					</View>
				</Overlay>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
}