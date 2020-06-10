import React, {useState} from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { getClassifications } from '../utils/firebase';

export function AdminScreen({ route, navigation }) {
	const [passingStudents, setPassingStudents] = useState([]);
	const [failingStudents, setFailingStudents] = useState([]);
	const [incompleteStudents, setIncompleteStudents] = useState([]);
	const [initialzing, setInitializing] = useState(true);

	if (initialzing) {
		getClassifications(route.params.schoolID).then(data => {
			console.log('Passing: ', data[0]);
			setPassingStudents(data[0]);
			console.log('Failing: ', data[1]);
			setFailingStudents(data[1]);
			console.log('Incomplete: ', data[2]);
			setIncompleteStudents(data[2]);
		});
		setInitializing(false);
	}

	return (
		<View>
			<ListItem 
				title="Pass"
				bottomDivider
				chevron
				badge={{ status: 'success', value: passingStudents.length }}
				onPress={() => {
					navigation.navigate('StudentList', { students: passingStudents })
				}}
			/>
			<ListItem
				title="Fail"
				bottomDivider
				chevron
				badge={{ status: 'error', value: failingStudents.length }}
				onPress={() => {
					navigation.navigate('StudentList', { students: failingStudents })
				}}
			/>
			<ListItem
				title="Incomplete"
				bottomDivider
				chevron
				badge={{ status: 'warning', value: incompleteStudents.length }}
				onPress={() => {
					navigation.navigate('StudentList', { students: incompleteStudents })
				}}
			/>
		</View>
	);
}