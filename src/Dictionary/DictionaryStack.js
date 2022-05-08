import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DictionaryScreen } from "./DictionaryScreen";

const Stack = createStackNavigator();

function DictionaryStack({ navigation }) {
  const DictionaryScreenComponent = ({ route }) => <DictionaryScreen />;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="딕"
        component={DictionaryScreenComponent}
      />
    </Stack.Navigator>
  );
}

export default DictionaryStack;
