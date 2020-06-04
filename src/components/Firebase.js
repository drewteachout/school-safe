import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('schools');

function onResult(QuerySnapshot) {
	console.log('Got schools collection result.');
}

function onError(error) {
	console.error(error)
}

async function getSchools() {
	const schools = await firestore()
		.collection('schools')
		.get();
	console.log('schools: ', schools)
}

async function getStudents() {
	const schools = await firestore()
		.collection('schools')
		.doc('0000')
		.collection('students')
		.get()
		.then(querySnapshot => {
			console.log('Total Students: ', querySnapshot.size)

			querySnapshot.forEach(documentSnapshot => {
				console.log('Student ID: ', documentSnapshot.id, documentSnapshot.data());
			})
		})
}