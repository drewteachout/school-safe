import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

export function StudentListScreen({ route, navigation }) {
  const students = route.params.students;

  return (
    <View>
      {
        students.map((student, i) => (
          <ListItem
            key={i}
            title={student.name}
            bottomDivider
          />
        ))
      }
    </View>
  )
}