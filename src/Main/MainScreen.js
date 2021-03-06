import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

// screen component
import WritingStack from "../Writing/WritingStack";
import CabinetStack from "../Cabinet/CabinetStack";
import DictionaryStack from "../Dictionary/DictionaryStack";
import MyPageStack from "../MyPage/MyPageStack";
import { navigationIcons } from "./TabBarIcons";

const Tab = createBottomTabNavigator();

export default class MainScreen extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            style: {
              backgroundColor: "#ae9784",
            },
          }}
        >
          <Tab.Screen
            name="글쓰기"
            component={WritingStack}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={
                      focused
                        ? navigationIcons[0].active
                        : navigationIcons[0].inactive
                    }
                    style={{ width: 30, height: 30 }}
                  />
                );
              },
              unmountOnBlur: true,
            }}
          />
          <Tab.Screen
            name="CabinetStack"
            component={CabinetStack}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={
                      focused
                        ? navigationIcons[1].active
                        : navigationIcons[1].inactive
                    }
                    style={{ width: 30, height: 30 }}
                  />
                );
              },
              unmountOnBlur: true,
            }}
          />
          <Tab.Screen
            name="백과사전"
            component={DictionaryStack}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={
                      focused
                        ? navigationIcons[2].active
                        : navigationIcons[2].inactive
                    }
                    style={{ width: 30, height: 30 }}
                  />
                );
              },
              unmountOnBlur: true,
            }}
          />
          <Tab.Screen
            name="마이페이지"
            component={MyPageStack}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={
                      focused
                        ? navigationIcons[3].active
                        : navigationIcons[3].inactive
                    }
                    style={{ width: 30, height: 30 }}
                  />
                );
              },
              unmountOnBlur: true,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
