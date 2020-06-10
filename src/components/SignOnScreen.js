import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import { isValidEmail } from '../utils/util';
import { styles } from './config';
import { getAdmin } from '../utils/firebase';

export function SignOnScreen({ route, navigation }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [error, setError] = useState('');

	const doSignIn = () => {
		let performSignIn = true;
		if (!email) {
			setEmailError('Email Required');
			performSignIn = false;
		} else if (!isValidEmail(email)) {
			setEmailError('Invalid Email');
			performSignIn = false;
		} else if (password == '') {
			setPasswordError('Password Required')
			performSignIn = false;
		}

		if (performSignIn) {
			getAdmin(route.params.schoolID).then(adminEmail => {
				if (email == adminEmail) {
					auth()
						.signInWithEmailAndPassword(email, password)
						.then(() => {
							console.log('Authenticated successfully.');
							navigation.navigate('Admin', { schoolID: route.params.schoolID });
						})
						.catch(error => {
							setPassword('');
							setPasswordError('Incorrect password');
						})
				} else {
					setEmail('');
					setPassword('');
					setEmailError('Incorrect email for school ' + route.params.schoolID);
				}
			});
		}
	}

	return (
		<View>
			<View style={styles.signOnHeader}>
				<Text h1 h1Style={styles.h1Style}>Admin Portal</Text>
			</View>
			<View style={styles.signOnBody}>
				<Input
					label='Email Address'
					placeholder='email@address.com'
					leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
					errorMessage={emailError}
					onChangeText={email => {
						setEmailError('');
						setEmail(email);
						setError('');
					}}
				/>
				<Input
					label='Password'
					placeholder='password'
					secureTextEntry
					leftIcon={{ type: 'font-awesome', name: 'lock'}}
					errorMessage={passwordError}
					onChangeText={password => {
						setPasswordError('');
						setPassword(password);
						setError('');
					}}
				/>
			</View>
			<View styles={styles.signOnBody}>
				<Text style={styles.errorTextStyle}>{error}</Text>
			</View>
			<View>
				<Button
					title="Sign In"
					containerStyle={{ padding: 25 }}
					onPress={() => doSignIn(email, password)}
				/>
			</View>
		</View>
	);
}