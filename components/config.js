import { StyleSheet } from 'react-native';

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
	header: {
		color: '#FFF',
		backgroundColor: '#005B82'
	},
	input: {
		margin: 0,
		padding: 0
	},
	text: {
		color: '#005B82',
		fontSize: 14,
		padding: 10
	}
});