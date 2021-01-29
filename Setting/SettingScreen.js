import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Gunny TODO
// Tempcode
// screen component (in Setting, it would be etc)
import WritingScreen from '../Writing/WritingScreen';
import StorageScreen from '../Storage/StorageScreen';

const Drawer = createDrawerNavigator();

function SettingScreen() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name="Writing" component={WritingScreen}></Drawer.Screen>
        <Drawer.Screen name="Storage" component={StorageScreen}></Drawer.Screen>
        <Drawer.Screen name="Setting" component={SettingScreen}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default SettingScreen; 
