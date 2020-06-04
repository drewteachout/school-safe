import auth from '@react-native-firebase/auth';

export async function signIn(email, password) {
	auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			console.log('Authenticated successfully.');
		})
		.catch(error => {
			console.error(error)
		})
}

export async function signInAnonymously() {
	auth()
			.signInAnonymously()
			.then(() => {
			  console.log('User signed in anonymously.')
			})
			.catch(error => {
				console.error(error);
			})
}

export async function signOut() {
	auth()
		.signOut()
		.then(() => {
			console.log('User successfully signed out.')
		})
}