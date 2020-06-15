import React, {useState} from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import { isValidEmail } from '../utils/util';
import { styles } from './config';
import { getAdminEmail } from '../utils/firebase';


export function SignOnScreen({ route, navigation }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [error, setError] = useState('');
	const [initializing, setInitializing] = useState(true);

	if (initializing) {
		setEmail('');
		setPassword('');
		setInitializing(false);
	}

	const doSignIn = () => {
		let performSignIn = true;
		if (!email) {
			setEmailError('The Email you entered does not match our records.');
			performSignIn = false;
		} else if (!isValidEmail(email)) {
			setEmailError('Please enter a valid email address.');
			setEmail('');
			performSignIn = false;
		}

		if (performSignIn) {
			getAdminEmail(route.params.schoolID).then(adminEmail => {
				if (email == adminEmail) {
					auth()
						.signInWithEmailAndPassword(email, password)
						.then(() => {
							navigation.navigate('Admin', { schoolID: route.params.schoolID });
						})
						.catch(error => {
							setPassword('');
							setPasswordError('The Password you entered does not match our records.');
						})
				} else {
					setEmail('');
					setPassword('');
					setEmailError('The Email/Password you entered does not match our records.');
				}
			});
		}
	}

	return (
		<TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} accessible={false}>
			<View>
				<View style={styles.signOnHeader}>
					<Text h1 h1Style={styles.h1Style}>Admin Portal</Text>
				</View>
				
				<View style={styles.signOnBody}>
					<Input
						label='Email Address'
						placeholder='email@address.com'
						autoCapitalize='none'
						leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
						errorMessage={emailError}
						value={email}
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
						autoCapitalize='none'
						leftIcon={{ type: 'font-awesome', name: 'lock'}}
						errorMessage={passwordError}
						value={password}
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
		</TouchableWithoutFeedback>
	);
}