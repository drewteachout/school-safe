import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CheckBox, Icon, ListItem, Text } from 'react-native-elements';

import { styles } from './config';

export function DetailScreen({ route, navigation }) {
  const [name, setName] = useState(route.params.name);
  const [lastSubmitDate, setLastSubmitDate] = useState(route.params.lastSubmitDate);
  const [surveyResults, setSurveyResults] = useState(route.params.surveyResults);
  const [oldResults, setOldResults] = useState(route.params.oldResults);

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.textLabel}>Name: </Text>
        <Text style={{ fontSize: 18 }}>{name}</Text>
        <Icon containerStyle={{marginLeft: 'auto'}} name={route.params.iconName} reverse color={route.params.color} size={12}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLabel}>Last Submit Date: </Text>
        <Text style={{ fontSize: 18 }}>{lastSubmitDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLabel}>Last Survey Response:</Text>
      </View>
      <ScrollView style={{ padding: 10, height: 350 }}>
        {
          surveyResults.map((item, i) => {
            return <CheckBox
              key={i}
              title={item.text}
              checked={item.checked}
            />
          })
        }
      </ScrollView>
      <ListItem 
        style={{ marginTop: 20 }}
        title='Past Survey Results'
        bottomDivider
        chevron={{ type: 'font-awesome', name: 'chevron-right' }}
        onPress={() => {
          navigation.navigate('PastList', { name: name, oldResults: oldResults, studentID: route.params.studentID });
        }}
      />
    </View>
  );
}