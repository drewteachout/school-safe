import firestore from '@react-native-firebase/firestore';

import { SCHOOLS } from '../components/config';

// Gets a list of all registered schools from the database
export async function getSchools() {
	let schools = [];
	await firestore()
		.collection(SCHOOLS)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(documentSnapshot => {
				schools.push(documentSnapshot.id);
			})
		});
	return schools;
}

export async function getStudents(schoolID) {
	let students = [];
	await firestore()
		.collection(SCHOOLS)
		.doc(schoolID)
		.get()
		.then(documentSnapshot => {
			documentSnapshot.data().students.forEach(student => {
				students.push(student);
			})
		})
	return students;
}