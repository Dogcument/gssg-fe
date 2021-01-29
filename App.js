import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screen component
import WritingScreen from './Writing/WritingScreen';
import StorageScreen from './Storage/StorageScreen';
import SettingScreen from './Setting/SettingScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Writing" component={WritingScreen}></Tab.Screen>
        <Tab.Screen name="Storage" component={StorageScreen}></Tab.Screen>
        <Tab.Screen name="Setting" component={SettingScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;