import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, TouchableOpacity } from "react-native";

// scene components
import { WritingPrepareScreen } from "./WritingPrepareScreen";
import { WritingScreen, OnDoneButtonClicked } from "./WritingScreen";
import { HeaderButtons } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/core";
import { WritingButtonBlackImg, BackButtonImg } from "../../assets/ImageList";

const Stack = createStackNavigator();

// The navigation(parameter) must be used in "OnDoneButtonClicked" function only.
function WritingStack({ navigation }) {
  const WritingPrepareScreenComponent = () => (
    <WritingPrepareScreen navigation={useNavigation()} />
  );
  const WritingScreenComponent = ({ route }) => (
    <WritingScreen
      subject={route.params.subject}
      navigation={useNavigation()}
    />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WritingPrepareScreen"
        component={WritingPrepareScreenComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WritingScreen"
        component={WritingScreenComponent}
        options={{
          title: "Brrraaaah",
          headerTitleStyle: {
            fontFamily: "SCBold",
            fontSize: 20,
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <HeaderButtons>
              <TouchableOpacity onPress={() => OnDoneButtonClicked(navigation)}>
                <Image
                  source={WritingButtonBlackImg}
                  style={{ width: 25, height: 25, marginRight: 20 }}
                />
              </TouchableOpacity>
            </HeaderButtons>
          ),
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Image
              style={{ marginLeft: 20, width: 20, height: 20 }}
              source={BackButtonImg}
            ></Image>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default WritingStack;
