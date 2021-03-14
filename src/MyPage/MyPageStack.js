import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MyPageScreen } from './MyPageScreen';
import { SettingScreen } from './SettingScreen';
import { MyPageItemDetail } from './MyPageItemDetail';

const Stack = createStackNavigator();

function MyPageStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyPage"
                component={() => <MyPageScreen navigation={navigation} />}
                options={{
                    title: "마이페이지",
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <HeaderButtons>
                            <Item
                                title="종"
                                onPress={() => alert("개발중입니다.")}
                            />
                            <Item
                                title="톱니"
                                onPress={() => OpenSettingScreen(navigation)}
                            />
                        </HeaderButtons>
                    )
                }}
            />
            <Stack.Screen
                name="Setting"
                component={() => <SettingScreen />}
                options={{
                    title: "세팅",
                    headerTitleAlign: 'left'
                }}
            />
            <Stack.Screen
                name="MyPageItemDetail"
                component={({ route }) => <MyPageItemDetail
                    writingTime={route.params.writingTime}
                    content={route.params.content} />
                }
                options={{
                    title: "마이페이지 아이템 디테일",
                    headerTitleAlign: 'left',
                }}
            />
        </Stack.Navigator>
    );
}

function OpenSettingScreen(navigation) {
    navigation.navigate('Setting');
}

export default MyPageStack;
