import firestore from '@react-native-firebase/firestore';

import { SCHOOLS, QUESTION_RECORD, STUDENTS, SURVEY_RESULTS } from '../components/config';

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

export async function getAdminEmail(schoolID) {
	let email = '';
	await firestore()
		.collection(SCHOOLS)
		.doc(schoolID)
		.get()
		.then(documentSnapshot => {
			email = documentSnapshot.data().admin_email;
		});
	return email;
}

export async function getAnswerKey(schoolID, questionID) {
	let answer_key = [];
	await firestore()
		.collection(SCHOOLS)
		.doc(schoolID)
		.collection(QUESTION_RECORD)
		.where('id', '==', questionID)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(documentSnapshot => {
				answer_key = documentSnapshot.data().answer_key;
			})
		})
	return answer_key;
}

export async function getQuestions(schoolID, questionID) {
	let questions = [];
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

export async function getStudentData(schoolID, studentID) {
	let oldResults = [];
	let answers = []
	let lastSubmitDate = null;
	let questionID = null;
	await firestore()
		.collection(SCHOOLS)
		.doc(schoolID)
		.collection(STUDENTS)
		.doc(studentID)
		.collection(SURVEY_RESULTS)
		.orderBy('submit_date', 'desc')
		.get()
		.then(querySnapshot => {
			let i = 0;
			querySnapshot.forEach(documentSnapshot => {
				if (i == 0) {
					answers = documentSnapshot.data().answers;
					lastSubmitDate = documentSnapshot.data().submit_date;
					questionID = documentSnapshot.data().question_id;
				} else {
					oldResults.push(documentSnapshot.data());
				}
				i++;
			})
		});
		
	return {
		answers: answers,
		lastSubmitDate: lastSubmitDate,
		questionID: questionID,
		oldResults: oldResults
	};
}

export async function getClassifications(schoolID) {
	let passingStudents = [];
	let failingStudents = [];
	let incompleteStudents = [];

	await firestore()
		.collection(SCHOOLS)
		.doc(schoolID)
		.collection(STUDENTS)
		.get()
		.then(querySnapshot => {
			const today = new Date();
			querySnapshot.forEach(documentSnapshot => {
				const month = documentSnapshot.data().last_submit_date.toDate().getMonth();
				const date = documentSnapshot.data().last_submit_date.toDate().getDate();
				const year = documentSnapshot.data().last_submit_date.toDate().getYear();
				if (today.getDate() == date && today.getMonth() == month && today.getYear() == year) {
					console.log('Name: ', documentSnapshot.data().name);
					if (documentSnapshot.data().passing) {
						passingStudents.push({ id: documentSnapshot.id, name: documentSnapshot.data().name});
					} else {
						failingStudents.push({ id: documentSnapshot.id, name: documentSnapshot.data().name});
					}
				} else {
					incompleteStudents.push({ id: documentSnapshot.id, name: documentSnapshot.data().name });
				}
			});
		});

	return [passingStudents, failingStudents, incompleteStudents];
}