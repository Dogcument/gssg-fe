import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screen component
import WritingScreen from './Writing/WritingScreen';
import CabinetStack from './Cabinet/CabinetStack';
import MyPageStack from './MyPage/MyPageStack';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="글쓰기" component={WritingScreen}></Tab.Screen>
        <Tab.Screen name="보관함" component={CabinetStack}></Tab.Screen>
        <Tab.Screen name="마이페이지" component={MyPageStack}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
