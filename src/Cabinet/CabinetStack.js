import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen } from './CabinetScreen';
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { ItemDetail } from '../Common/ItemDetail';
const Stack = createStackNavigator();

function CabinetStack() {
    const CabinetComponent = () => <CabinetScreen navigation={useNavigation()} />
    const ItemDetailComponent = ({ route }) => <ItemDetail
        writingTime={route.params.writingTime}
        content={route.params.content} />

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
                    headerRight: () => (
                        <RNPickerSelect
                            onValueChange={(value) => console.log(value)}
                            items={[
                                { label: "테스트 Lavel", value: "테스트 Value" }
                            ]}
                        >
                        </RNPickerSelect>
                    )
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
                                    source={require('../Images/Bone.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: 20, height: 20, marginRight: 15 }}
                                activeOpacity={0.5}
                                onPress={() => alert("댓글 표시 화면으로 이동")}>
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require('../Images/Chat.png')} />
                            </TouchableOpacity>
                        </HeaderButtons>
                    )
                }}
            />
        </Stack.Navigator>
    );
}

export default CabinetStack;
