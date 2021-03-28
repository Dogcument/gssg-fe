import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// screen component
import WritingStack from '../Writing/WritingStack';
import CabinetStack from '../Cabinet/CabinetStack';
import MyPageStack from '../MyPage/MyPageStack';

import { navigationIcons } from './TabBarIcons';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        style: {
          backgroundColor: '#ae9784'
        }
      }}>
        <Tab.Screen
          name="글쓰기"
          component={WritingStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={focused ? navigationIcons[0].active : navigationIcons[0].inactive}
                  style={{ width: 20, height: 20 }}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="보관함"
          component={CabinetStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={focused ? navigationIcons[1].active : navigationIcons[1].inactive}
                  style={{ width: 20, height: 20 }}
                />
              );
            }
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={MyPageStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={focused ? navigationIcons[2].active : navigationIcons[2].inactive}
                  style={{ width: 20, height: 20 }}
                />
              );
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
