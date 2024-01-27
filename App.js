import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PointsTableScreen from './src/screens/PointsTableScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import {Text, TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PointsTable">
        <Stack.Screen
          name="PointsTable"
          component={PointsTableScreen}
          options={{
            headerStyle: {backgroundColor: '#f2f2f2'},
            headerTitle: 'Star Wars Blaster Tournament',
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Matches"
          component={MatchesScreen}
          options={({route}) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
