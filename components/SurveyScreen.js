import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './config';

export function SurveyScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Survey Screen</Text>
			<Button
				title="Submit"
				onPress={() => navigation.popToTop()}
			/>
		</View>
	);
}