import * as React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { CabinetScreen } from "./CabinetScreen";
import { ItemDetailScreen } from "../Common/ItemDetailScreen";
import { BackButtonImg } from "../../assets/ImageList";
import { CommentScreen } from "../Common/CommentScreen";
import { ProfileScreen } from "../Profile/ProfileScreen";
import { ProtoWritings } from "../Common/ProtoWritings";

const Stack = createStackNavigator();

function CabinetStack({ navigation }) {
  const CabinetComponent = ({ route }) => (
    <CabinetScreen navigation={navigation} subject={route.params.subject} />
  );
  const ItemDetailScreenComponent = ({ route }) => (
    <ItemDetailScreen
      navigation={navigation}
      post={route.params.post}
    />
  );
  const CommentComponent = ({ route }) => (
    <CommentScreen id={route.params.id} navigation={navigation} />
  );
  const ProfileScreenComponent = ({ route }) => (
    <ProfileScreen
      navigation={navigation}
      userName={route.params.userName}
    />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CabinetScreen"
        initialParams={{ subject: ProtoWritings[0] }}
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
          title: "",
          headerBackImage: () => (
            <Image
              style={{ marginLeft: 20, width: 20, height: 20 }}
              source={BackButtonImg}
            ></Image>
          ),
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreenComponent}
        options={({ route }) => ({
          title: route.params.userName,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SCBold",
            color: "#FFFFFF",
          },
          headerStyle: {
            backgroundColor: "#ae9784",
            shadowColor: "transparent",
          },
          headerBackImage: () => (
            <Image
              style={{ marginLeft: 20, width: 20, height: 20 }}
              source={BackButtonImg}
            ></Image>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default CabinetStack;
