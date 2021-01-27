import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screen component
import WritingScreen from './Writing/WritingScreen';
import StorageScreen from './Storage/StorageScreen';
import SettingScreen from './Setting/SettingScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Writing">
        <Stack.Screen name="Writing" component={WritingScreen} />
        <Stack.Screen name="Storage" component={StorageScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
