import React from 'react';
import { View, Text, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './config';

export function AdminScreen() {
	return (
		<View>
			<ListItem 
				title="Permitted"
				bottomDivider
				chevron
				badge={{ status: 'success', value: 75 }}
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