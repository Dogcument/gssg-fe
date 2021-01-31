import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screen component
import WritingScreen from './Writing/WritingScreen';
import CabinetScreen from './Cabinet/CabinetScreen';
import MyPageScreen from './MyPage/MyPageScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Writing" component={WritingScreen}></Tab.Screen>
        <Tab.Screen name="Cabinet" component={CabinetScreen}></Tab.Screen>
        <Tab.Screen name="MyPage" component={MyPageScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;