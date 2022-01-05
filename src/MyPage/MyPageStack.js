import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons } from "react-navigation-header-buttons";
import { ProfileScreen } from "../Profile/ProfileScreen";
import { SettingScreen } from "./SettingScreen";
import { styles } from "./Styles";
import { TouchableOpacity, Image } from "react-native";
import { ItemDetailScreen } from "../Common/ItemDetailScreen";
import { BackButtonImg, AlarmImg, GearImg } from "../../assets/ImageList";
import { ModifyAccountScreen } from "./ModifyAccountScreen";
import { CommentScreen } from "../Common/CommentScreen";
import UserInfo from "../Common/UserInfo";

const Stack = createStackNavigator();

function MyPageStack({ navigation }) {
  const userInfo = UserInfo.instance;
  const userName = userInfo.getNickName();

  if (userName == null) {
    alert("MyPageStack: userName does not exist");
    return;
  }

  const ProfileComponent = () => (
    <ProfileScreen navigation={navigation} userName={userName} />
  );
  const SettingComponent = () => <SettingScreen navigation={navigation} />;
  const ModifyAccountComponent = () => (
    <ModifyAccountScreen navigation={navigation} />
  );
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
        name="Profile"
        component={ProfileComponent}
        options={{
          title: userName,
          headerShown: true,
          headerTitleStyle: {
            fontFamily: "SCBold",
            color: "#FFFFFF",
          },
          headerStyle: {
            backgroundColor: "#ae9784",
            shadowColor: "transparent",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <HeaderButtons>
              <TouchableOpacity
                style={[styles.FacebookStyle, { marginRight: 5 }]}
                activeOpacity={0.5}
                onPress={() => alert("개발중입니다.")}
              >
                <Image style={styles.StackIconStyle} source={AlarmImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.FacebookStyle, { marginRight: 15 }]}
                activeOpacity={0.5}
                onPress={() => OpenSettingScreen(navigation)}
              >
                <Image style={styles.StackIconStyle} source={GearImg} />
              </TouchableOpacity>
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingComponent}
        options={{
          title: "설정",
          headerTitleStyle: {
            fontFamily: "SCBold",
          },
          headerTitleAlign: "left",
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Image
              style={{ marginLeft: 20, width: 20, height: 20 }}
              source={BackButtonImg}
            ></Image>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ModifyAccount"
        component={ModifyAccountComponent}
        options={{
          title: "개인정보 변경",
          headerTitleStyle: {
            fontFamily: "SCBold",
          },
          headerTitleAlign: "left",
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Image
              style={{ marginLeft: 20, width: 20, height: 20 }}
              source={BackButtonImg}
            ></Image>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ItemDetailScreen"
        component={ItemDetailScreenComponent}
        options={{
          title: "",
          headerTitleAlign: "left",
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Image
              style={{ marginLeft: 20, width: 20, height: 20 }}
              source={BackButtonImg}
            ></Image>
          ),
        }}
      ></Stack.Screen>
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

function OpenSettingScreen(navigation) {
  navigation.navigate("Setting");
}

export default MyPageStack;
