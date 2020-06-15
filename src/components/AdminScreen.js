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
			setPassingStudents(data[0]);
			setFailingStudents(data[1]);
			setIncompleteStudents(data[2]);
		});
		setInitializing(false);
	}

	return (
		<View>
			<ListItem 
				title="Pass"
				bottomDivider
				chevron={{ type: 'font-awesome', name: 'chevron-right' }}
				badge={{ status: 'success', value: passingStudents.length }}
				onPress={() => {
					navigation.navigate('List', { iconColor: '#52c41a', iconName: 'check', schoolID: route.params.schoolID, students: passingStudents })
				}}
			/>
			<ListItem
				title="Fail"
				bottomDivider
				chevron={{ type: 'font-awesome', name: 'chevron-right' }}
				badge={{ status: 'error', value: failingStudents.length }}
				onPress={() => {
					navigation.navigate('List', { iconColor: '#ff190c', iconName: 'error', schoolID: route.params.schoolID, students: failingStudents })
				}}
			/>
			<ListItem
				title="Incomplete"
				bottomDivider
				chevron={{ type: 'font-awesome', name: 'chevron-right' }}
				badge={{ status: 'warning', value: incompleteStudents.length }}
				onPress={() => {
					navigation.navigate('List', { iconColor: '#faad14', iconName: 'warning', schoolID: route.params.schoolID, students: incompleteStudents })
				}}
			/>
		</View>
	);
}