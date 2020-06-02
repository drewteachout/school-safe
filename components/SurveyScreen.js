import React, {useState} from 'react';
import { View } from 'react-native';
import { Button, CheckBox, Divider, Input, Text, ListItem } from 'react-native-elements';

import { styles } from './config';

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
	};

	return (
		<View>
			<Input inputStyle={styles.input} label='School ID' />
			<Input inputStyle={styles.input} label='Student Name' />
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
			<Button
				title="Submit"
				onPress={() => { onSubmit(); navigation.popToTop() }}
			/>
		</View>
	);
}