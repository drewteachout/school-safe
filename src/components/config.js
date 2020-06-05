import { StyleSheet } from 'react-native';

export const SCHOOLS = 'schools';
export const SURVEY_RESULTS = 'survey_results';
export const STUDENTS = 'students';

export const screenOptions = {
	title: 'School Safe',
	headerStyle: {
		backgroundColor: '#005B82'
	},
	headerTintColor: '#FFF'
};

export const styles = StyleSheet.create({
	button: {
		width: 125
	},
	buttonContainer: {
		padding: 10
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	errorTextStyle: {
		color: 'red',
		alignItems: 'center',
		justifyContent: 'center'
	},
	h1Style: {
		color: '#005B82',
		padding: 30
	},
	header: {
		color: '#FFF',
		backgroundColor: '#005B82'
	},
	input: {
		width: 145
	},
	signOnHeader: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	signOnBody: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	surveyHeader: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#005B82',
		fontSize: 14,
		padding: 10
	}
});