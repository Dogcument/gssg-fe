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
    const MyPageComponent = () => <MyPageScreen navigation={navigation} />;
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyPage"
                component={MyPageComponent}
                options={{
                    title: "마이페이지",
                    headerTitleStyle: {
                        fontFamily: 'topbar'
                    },
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <HeaderButtons>
                            <TouchableOpacity
                                style={[styles.FacebookStyle, {marginRight : 5 }]} activeOpacity={0.5}
                                onPress={() => alert("개발중입니다.")}>
                                <Image
                                    style={styles.StackIconStyle}
                                    source={require('./Images/1_Alarm.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.FacebookStyle, {marginRight : 15 }]} activeOpacity={0.5}
                                onPress={() => OpenSettingScreen(navigation)}>
                                <Image
                                    style={styles.StackIconStyle}
                                    source={require('./Images/2_Setup.png')} />
                            </TouchableOpacity>
                        </HeaderButtons>
                    )
                }} />
            <Stack.Screen
                name="Setting"
                options={{
                    title: "세팅",
                    headerTitleStyle: {
                        fontFamily: 'topbar'
                    },
                    headerTitleAlign: 'left'
                }}>
                {() => <SettingScreen />}
            </Stack.Screen>
            <Stack.Screen
                name="MyPageItemDetail"
                options={{
                    title: "",
                    headerTitleAlign: 'left',
                    headerBackTitleVisible: false,
                    headerBackImage: () =>
                    <Image
                        style={{ marginLeft: 20, width: 20, height: 20 }}
                        source={require('../Main/Images/BackButton.png')}>
                    </Image>
                }}>
                {({ route }) => <MyPageItemDetail
                    writingTime={route.params.writingTime}
                    content={route.params.content} />
                }
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function OpenSettingScreen(navigation) {
    navigation.navigate('Setting');
}

export default MyPageStack;
