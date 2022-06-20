import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DictionaryScreen } from "./DictionaryScreen";

const Stack = createStackNavigator();

function DictionaryStack({ navigation }) {
  const DictionaryScreenComponent = ({ route }) => <DictionaryScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dictionary" component={DictionaryScreenComponent} />
    </Stack.Navigator>
  );
}

export default DictionaryStack;
