import React, {useState} from 'react';
import { ScrollView, View } from 'react-native';
import { Button, CheckBox, Divider, Input, Overlay, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

import { styles, getDayArray, getYearArray, MONTHS, SCHOOLS, STUDENTS, SURVEY_RESULTS } from './config';
import { nameHashCode } from '../utils/util'
import { getStudents } from '../utils/firebase';

const schoolCollection = firestore().collection(SCHOOLS);

export function SurveyScreen({ route, navigation }) {
	const [state, setState] = useState([
		{ id: 0, text: 'Symptom A', checked: false },
		{ id: 1, text: 'Symptom B', checked: false },
		{ id: 2, text: 'Symptom C', checked: false },
		{ id: 3, text: 'Symptom D', checked: false },
		{ id: 4, text: 'Symptom E', checked: false }
	]);
	const [name, setName] = useState('');
	const [month, setMonth] = useState({month: 'January'});
	const [day, setDay] = useState('');
	const [year, setYear] = useState('');
	const [visible, setVisible] = useState(false);
	const schoolID = route.params.schoolID;

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

	function addSurvey() {
		const timeStamp = firestore.FieldValue.serverTimestamp();
		const studentID = nameHashCode(name.toLowerCase() + month + day + year).toString();
		console.log('Name: ', name);
		console.log('DOB: ', month + '-' + day + '-' + year)
		console.log('Student Hash: ', studentID);

		getStudents(schoolID).then(students => {
			let studentExists = false;
			students.forEach(id => {
				if (id.toString() === studentID) {
					studentExists = true;
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
					navigation.popToTop();
				}
			});
			if (!studentExists) {
				setVisible(true);
			}
		})
	}

	return (
		<ScrollView style={styles.root} contentContainerStyle={styles.rootContainer}>
			<View styles={styles.rowContainer}>
				<Input
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
				<Text style={styles.text}>Has your child experienced any of theses symptoms in the last 14 days? Please check all that apply.</Text>
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
			<Button
				title="Submit"
				containerStyle={{ width: 350, paddingBottom: 25 }}
				onPress={() => { addSurvey(); }}
			/>
			<Overlay
				isVisible={visible}
				onBackdropPress={() => setVisible(false)}
				overlayStyle={{ height: 150, width: 300 }}
				>
				<Text style={styles.text}>Student not found. Please check that Student Name 
					and Date of Birth fields are correct. If still encountering issue contact administrator.</Text>
				<Button title='Continue' style={styles.button} onPress={() => setVisible(false)}/>
			</Overlay>
		</ScrollView>
	);
}