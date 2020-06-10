import firestore from '@react-native-firebase/firestore';

import { SCHOOLS, QUESTION_RECORD } from '../components/config';

// Gets a list of all registered schools from the database
export async function getSchools() {
	let schools = [];
	await firestore()
		.collection(SCHOOLS)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(documentSnapshot => {
				schools.push(documentSnapshot.id);
			});
		});
	return schools;
}

export async function getQuestions(schoolID, questionID) {
	let questions = [];
	let id = 0;
	await firestore()
		.collection(SCHOOLS)
		.doc(schoolID)
		.collection(QUESTION_RECORD)
		.where('id', '==', questionID)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(documentSnapshot => {
				questions = documentSnapshot.data().questions;
			})
		})
	return questions;
}

export async function getQuestionID(schoolID) {
	let id = 0;
	await firestore()
		.collection(SCHOOLS)
		.doc(schoolID)
		.get()
		.then(documentSnapshot => {
			id = documentSnapshot.data().question_id
		});
	return id;
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
			});
		});
	return students;
}