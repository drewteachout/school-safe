import React, {useState} from 'react';
import { View } from 'react-native';
import { Button, CheckBox, Divider, Input, Text, ListItem } from 'react-native-elements';
import { styles } from './config';



export function SurveyScreen({ navigation }) {
	const [state, setState] = useState([
		{ key: 0, text: 'Symptom A', checked: false },
		{ key: 1, text: 'Symptom B', checked: false },
		{ key: 2, text: 'Symptom C', checked: false },
		{ key: 3, text: 'Symptom D', checked: false },
		{ key: 4, text: 'Symptom E', checked: false }
	]);
	// this.state = [
	// 	{ text: 'Symptom A', checked: false },
	// 	{ text: 'Symptom B', checked: false },
	// 	{ text: 'Symptom C', checked: false },
	// 	{ text: 'Symptom D', checked: false },
	// 	{ text: 'Symptom E', checked: false }
	// ]

	const changeState = (id) => {
		console.log('change state', id)
			// setState(prevState => {
			// 	console.log(prevState)
			// })
	}

	return (
		<View>
			<Input labelStyle={styles.input} containerStyle={styles.input} inputContainerStyle={styles.input} inputStyle={styles.input} label='Student Name' />
			<Text style={styles.text}>Has your child experienced any of theses symptoms in the last 14 days? Please check all that apply.</Text>
			<Divider style={{ backgroundColor: '#005B82'}} />
			{
				state.map((item) => (
					<CheckBox
						title={item.text}
						checked={item.checked}
						onPress={changeState(item.key)}
					/>
				))
			}
			<Button
				title="Submit"
				onPress={() => navigation.popToTop()}
			/>
		</View>
	);
}