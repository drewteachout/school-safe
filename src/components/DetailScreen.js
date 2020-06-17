import React from 'react';
import { ScrollView, View } from 'react-native';
import { CheckBox, Icon, ListItem, Text } from 'react-native-elements';

import { styles } from '../config';

export function DetailScreen({ route, navigation }) {
	return (
		<View>
			<View style={styles.row}>
				<Text style={styles.textLabel}>Name: </Text>
				<Text style={{ fontSize: 18 }}>{route.params.name}</Text>
				<Icon containerStyle={{marginLeft: 'auto'}} name={route.params.iconName} reverse color={route.params.iconColor} size={12}/>
			</View>
			<View style={styles.row}>
				<Text style={styles.textLabel}>Last Submit Date: </Text>
				<Text style={{ fontSize: 18 }}>{route.params.lastSubmitDate}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.textLabel}>Last Survey Response:</Text>
			</View>
			<ScrollView style={{ padding: 10, height: 350 }}>
				{
					route.params.surveyResults.map((item, i) => (
						<CheckBox
							key={i}
							title={item.text}
							checked={item.checked}
						/>
					))
				}
			</ScrollView>
			<ListItem 
				style={{ marginTop: 20 }}
				title='Past Survey Results'
				bottomDivider
				chevron={{ type: 'font-awesome', name: 'chevron-right' }}
				onPress={() => { navigation.navigate('PastList', { name: route.params.name, oldResults: route.params.oldResults, schoolID: route.params.schoolID, studentID: route.params.studentID }); }}
			/>
		</View>
	);
}