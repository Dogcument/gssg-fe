import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons } from "react-navigation-header-buttons";
import { MyPageScreen } from "./MyPageScreen";
import { SettingScreen } from "./SettingScreen";
import { styles } from "./Styles";
import { TouchableOpacity, Image } from "react-native";
import { ItemDetail } from "../Common/ItemDetail";
import {
  BoneBlackImg,
  ChatImg,
  BackButtonImg,
  AlarmImg,
  SetUpImg,
} from "../../assets/ImageList";

const Stack = createStackNavigator();

function MyPageStack({ navigation }) {
  const MyPageComponent = () => <MyPageScreen navigation={navigation} />;
  const ItemDetailComponent = ({ route }) => (
    <ItemDetail
      navigation={route.params.navigation}
      writingTime={route.params.writingTime}
      content={route.params.content}
      selectedDog={route.params.selectedDog}
    />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPage"
        component={MyPageComponent}
        options={{
          title: "마이페이지",
          headerTitleStyle: {
            fontFamily: "SpoqaBold",
          },
          headerStyle: {
            backgroundColor: "#ae9784",
            shadowColor: "transparent",
          },
          headerTitleAlign: "left",
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
                <Image style={styles.StackIconStyle} source={SetUpImg} />
              </TouchableOpacity>
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Setting"
        options={{
          title: "세팅",
          headerTitleStyle: {
            fontFamily: "SpoqaBold",
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
      >
        {() => <SettingScreen />}
      </Stack.Screen>
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailComponent}
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
          headerRight: () => (
            <HeaderButtons>
              <TouchableOpacity
                style={{ width: 20, height: 20, marginRight: 15 }}
                activeOpacity={0.5}
                onPress={() => alert("좋아요 표시 화면으로 이동")}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={BoneBlackImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: 20, height: 20, marginRight: 15 }}
                activeOpacity={0.5}
                onPress={() => alert("댓글 표시 화면으로 이동")}
              >
                <Image style={{ width: 20, height: 20 }} source={ChatImg} />
              </TouchableOpacity>
            </HeaderButtons>
          ),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function OpenSettingScreen(navigation) {
  navigation.navigate("Setting");
}

export default MyPageStack;
