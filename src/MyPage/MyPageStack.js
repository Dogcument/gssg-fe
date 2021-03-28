import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MyPageScreen } from './MyPageScreen';
import { SettingScreen } from './SettingScreen';
import { MyPageItemDetail } from './MyPageItemDetail';
import { styles } from './Styles';
import { TouchableOpacity, Image } from 'react-native';

const Stack = createStackNavigator();

function MyPageStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyPage"
                component={() => <MyPageScreen navigation={navigation} />}
                options={{
                    title: "마이페이지",
                    headerTitleStyle: {
                        fontFamily: 'topbar'
                    },
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <HeaderButtons>
                            <TouchableOpacity
                                style={styles.FacebookStyle} activeOpacity={0.5}
                                onPress={() => alert("개발중입니다.")}>
                                <Image
                                    style={styles.ImageIconStyle}
                                    source={require('./Images/1_Alarm.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.FacebookStyle} activeOpacity={0.5}
                                onPress={() => OpenSettingScreen(navigation)}>
                                <Image
                                    style={styles.ImageIconStyle}
                                    source={require('./Images/2_Setup.png')} />
                            </TouchableOpacity>
                        </HeaderButtons>
                    )
                }}
            />
            <Stack.Screen
                name="Setting"
                component={() => <SettingScreen />}
                options={{
                    title: "세팅",
                    headerTitleStyle: {
                        fontFamily: 'topbar'
                    },
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
