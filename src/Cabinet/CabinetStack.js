import * as React from "react";
import { Image, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { CabinetScreen } from "./CabinetScreen";
import { ItemDetailScreen } from "../Common/ItemDetailScreen";
import { BackButtonImg } from "../../assets/ImageList";
import { CommentScreen } from "../Common/CommentScreen";

const Stack = createStackNavigator();

function CabinetStack({ navigation }) {
  const CabinetComponent = () => <CabinetScreen navigation={navigation} />;
  const ItemDetailScreenComponent = ({ route }) => (
    <ItemDetailScreen
      navigation={route.params.navigation}
      post={route.params.post}
    />
  );
  const CommentComponent = ({ route }) => (
    <CommentScreen id={route.params.id} />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cabinet"
        component={CabinetComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ItemDetailScreen"
        component={ItemDetailScreenComponent}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Image
              style={{ marginLeft: 20, width: 20, height: 20 }}
              source={BackButtonImg}
            ></Image>
          ),
        }}
      />
      <Stack.Screen
        name="Comment"
        component={CommentComponent}
        options={{
          title: "댓글",
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

export default CabinetStack;
