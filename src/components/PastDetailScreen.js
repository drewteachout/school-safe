import React from 'react';
import { ScrollView, View } from 'react-native';
import { CheckBox, Icon, Text } from 'react-native-elements';

import { styles } from '../config';

export function PastDetailScreen({ route }) {
	return (
		<View>
			<View style={styles.row}>
				<Text style={styles.textLabel}>Name: </Text>
				<Text style={{ fontSize: 18 }}>{route.params.name}</Text>
				<Icon containerStyle={{marginLeft: 'auto'}} name={route.params.iconName} reverse color={route.params.iconColor} size={12}/>
			</View>
			<View style={styles.row}>
				<Text style={styles.textLabel}>Submit Date: </Text>
				<Text style={{ fontSize: 18 }}>{route.params.submitDate}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textLabel}>Survey Response:</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.text}>{route.params.surveyPrompt}</Text>
			</View>
			<ScrollView style={{ height: 250 }}>
				{
					route.params.surveyResults.map((item, i) => {
						return <CheckBox
							key={i}
							title={item.text}
							checked={item.checked}
						/>
					})
				}
			</ScrollView>
		</View>
	);
}