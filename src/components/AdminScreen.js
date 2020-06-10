import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import { styles } from './config';

export function AdminScreen({ route, navigation }) {
	const [permittedStudents, setPermittedStudents] = useState([]);
	const [bannedStudents, setBannedStudents] = useState([]);
	const [incompleteStudents, setIncompleteStudents] = useState([]);
	const [user, setUser] = useState(route.params.user);

	return (
		<View>
			<ListItem 
				title="Permitted"
				bottomDivider
				chevron
				badge={{ status: 'success', value: permittedStudents.length }}
			/>
			<ListItem
				title="Banned"
				bottomDivider
				chevron
				badge={{ status: 'error', value: 2 }}
			/>
			<ListItem
				title="Incomplete"
				bottomDivider
				chevron
				badge={{ status: 'warning', value: 23 }}
			/>
		</View>
	);
}