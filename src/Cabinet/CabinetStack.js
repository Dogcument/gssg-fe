import * as React from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { CabinetScreen } from "./CabinetScreen";
import { HeaderButtons } from "react-navigation-header-buttons";
import { ItemDetail } from "../Common/ItemDetail";
import { BoneBlackImg, ChatImg, BackButtonImg } from "../../assets/ImageList";

const Stack = createStackNavigator();

function onHeaderClicked() {
  CabinetScreen.onWritingsClicked();
}

function CabinetStack({ navigation }) {
  const CabinetComponent = () => <CabinetScreen navigation={navigation} />;
  const ItemDetailComponent = ({ route }) => (
    <ItemDetail navigation={route.params.navigation} post={route.params.post} />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cabinet"
        component={CabinetComponent}
        options={{
          title: "",
          headerTitleStyle: {
            fontFamily: "SCBold",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Text style={{ fontFamily: "SCBold", fontSize: 18.5 }}>
              {"   "}보관함
            </Text>
          ),
          headerRight: () => (
            <HeaderButtons>
              <TouchableOpacity style={{paddingRight: 10, flexDirection: 'row', alignItems:'center'}}>
                <Image
                  style={{height: 12.5, width: 12.5, paddingRignt: 5}}
                  source={{uri:'https://image.flaticon.com/icons/png/512/156/156319.png'}}/>
                <Text style={{fontFamily: 'SCBold', fontSize: 17.5}}>
                  글감
                </Text>
              </TouchableOpacity>
            </HeaderButtons>
          )
        }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailComponent}
        options={{
          title: "",
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
      />
    </Stack.Navigator>
  );
}

export default CabinetStack;
