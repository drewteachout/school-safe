import { StyleSheet } from 'react-native';

export const QUESTION_RECORD = 'question_record';
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
		fontSize: 12,
		color: 'red',
		alignItems: 'center',
		justifyContent: 'center'
	},
	h1Style: {
		color: '#005B82',
		padding: 20
	},
	h3Style: {
		color: '#005B82',
		fontSize: 24
	},
	h4Style: {
		color: '#005B82',
		fontSize: 16,
		padding: 10
	},
	header: {
		color: '#FFF',
		backgroundColor: '#005B82'
	},
	input: {
		width: 145
	},
	inputLabel: {
		color: '#005B82',
		width: 350,
		textTransform: 'uppercase'
	},
	root: {
		flex: 1
	},
	rootContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	row: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center'
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
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
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#005B82',
		fontSize: 14,
		paddingBottom: 20
	},
	textLabel: {
		color: '#005B82',
		fontSize: 24,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	}
});