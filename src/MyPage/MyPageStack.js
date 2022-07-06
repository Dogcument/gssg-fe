import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons } from "react-navigation-header-buttons";
import { ProfileScreen, ProfileEditScreen } from "../Profile/ProfileScreen";
import { SettingScreen } from "./SettingScreen";
import { TouchableOpacity, Image } from "react-native";
import { ItemDetailScreen } from "../Common/ItemDetailScreen";
import { BackButtonImg, AlarmImg, GearImg } from "../../assets/ImageList";
import { ModifyAccountScreen } from "./ModifyAccountScreen";
import { CommentScreen } from "../Common/CommentScreen";
import UserInfo from "../Common/UserInfo";

const Stack = createStackNavigator();

function MyPageStack({ navigation }) {
  const userInfo = UserInfo.instance;
  const nickName = userInfo.getNickName();

  if (nickName == null) {
    alert("MyPageStack: userName does not exist");
    return;
  }

  const ProfileEditComponent = ({ route }) => (
    <ProfileEditScreen navigation={navigation} />
  );
  
  const ProfileComponent = ({route}) => (
    <ProfileScreen navigation={navigation} userName={nickName} />
  );
  const SettingComponent = () => <SettingScreen navigation={navigation} />;
  const ModifyAccountComponent = ({route}) => (
    <ModifyAccountScreen navigation={navigation} />
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

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileComponent}
        options={{
          title: nickName,
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
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 40,
                  borderRadius: 5,
                  margin: 5,
                  marginRight: 5,
                }}
                activeOpacity={0.5}
                onPress={() => alert("개발중입니다.")}
              >
                <Image
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={AlarmImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 40,
                  borderRadius: 5,
                  margin: 5,
                  marginRight: 15,
                }}
                activeOpacity={0.5}
                onPress={() => OpenSettingScreen(navigation)}
              >
                <Image
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  source={GearImg}
                />
              </TouchableOpacity>
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditComponent}
        options={{
          title: nickName,
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
