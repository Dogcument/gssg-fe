import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen } from './CabinetScreen';
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons } from 'react-navigation-header-buttons';
import { ItemDetail } from '../Common/ItemDetail';
const Stack = createStackNavigator();

function CabinetStack() {
    const CabinetComponent = () => <CabinetScreen navigation={useNavigation()} />
    const ItemDetailComponent = ({ route }) => <ItemDetail
        writingTime={route.params.writingTime}
        content={route.params.content}
        selectedDog={route.params.selectedDog}
         />

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cabinet"
                component={CabinetComponent}
                options={{
                    title: "보관함",
                    headerTitleStyle: {
                        fontFamily: 'SpoqaBold'
                    },
                    headerTitleAlign: 'left',
                }}
            />
            <Stack.Screen
                name="ItemDetail"
                component={ItemDetailComponent}
                options={{
                    title: '',
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <Image
                            style={{ marginLeft: 20, width: 20, height: 20 }}
                            source={require('../Main/Images/BackButton.png')}>
                        </Image>
                    ),
                    headerRight: () => (
                        <HeaderButtons>
                            <TouchableOpacity
                                style={{ width: 20, height: 20, marginRight: 15 }}
                                activeOpacity={0.5}
                                onPress={() => alert("좋아요 표시 화면으로 이동")}>
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../Common/Images/Bone.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: 20, height: 20, marginRight: 15 }}
                                activeOpacity={0.5}
                                onPress={() => alert("댓글 표시 화면으로 이동")}>
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../Common/Images/Chat.png')} />
                            </TouchableOpacity>
                        </HeaderButtons>
                    )
                }}
            />
        </Stack.Navigator>
    );
}

export default CabinetStack;
