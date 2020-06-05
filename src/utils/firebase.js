import firestore from '@react-native-firebase/firestore';

// Gets a list of all registered schools from the database
export async function getSchools() {
	let schools = [];
	await firestore()
		.collection('schools')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(documentSnapshot => {
				schools.push(documentSnapshot.id);
			})
		});
	return schools;
}
