import React, {useState} from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

import { signIn } from '../utils/authentication';
import { isValidEmail } from '../utils/util';
import { styles } from './config';

export function SignOnScreen({ navigation }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fetching, setFetching] = useState(false)
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [isEmailValid, setEmailValid] = useState(true)
	const [isPasswordValid, setPasswordValid] = useState(true)

	const doSignIn = () => {
		let performSignIn = true;
		if (!email) {
			setEmailError('Email Required');
			setEmailValid(false);
			performSignIn = false;
		} else if (!isValidEmail(email)) {
			setEmailError('Invalid Email');
			setEmailValid(false);
			performSignIn = false;
		} else if (!password && password.trim() && password.length > 6) {
			setPasswordError('Weak password, minimum 6 chars')
			setPasswordValid(false)
		}

		if (performSignIn) {
			signIn(email, password);
			setEmail('');
			setPassword('');
			navigation.navigate('Admin');
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
						setEmailError('')
						setEmail(email)
					}}
				/>
				<Input
					label='Password'
					placeholder='password'
					secureTextEntry
					leftIcon={{ type: 'font-awesome', name: 'lock'}}
					errorMessage={passwordError}
					onChangeText={password => {
						setPasswordValid('')
						setPassword(password)
					}}
				/>
			</View>
			<View>
				<Button
					title="Sign In"
					onPress={() => doSignIn(email, password)}
				/>
			</View>
		</View>
	)
}