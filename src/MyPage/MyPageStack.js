import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { MyPageScreen } from './MyPageScreen';
import { SettingScreen } from './SettingScreen';
import { styles } from './Styles';
import { TouchableOpacity, Image } from 'react-native';
import { ItemDetail } from '../Common/ItemDetail';

const Stack = createStackNavigator();

function MyPageStack({ navigation }) {
    const MyPageComponent = () => <MyPageScreen navigation={navigation} />;
    const ItemDetailComponent = ({ route }) => <ItemDetail
        writingTime={route.params.writingTime}
        content={route.params.content} />

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyPage"
                component={MyPageComponent}
                options={{
                    title: "마이페이지",
                    headerTitleStyle: {
                        fontFamily: 'SpoqaBold'
                    },
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <HeaderButtons>
                            <TouchableOpacity
                                style={[styles.FacebookStyle, { marginRight: 5 }]} activeOpacity={0.5}
                                onPress={() => alert("개발중입니다.")}>
                                <Image
                                    style={styles.StackIconStyle}
                                    source={require('./Images/1_Alarm.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.FacebookStyle, { marginRight: 15 }]} activeOpacity={0.5}
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
                        fontFamily: 'SpoqaBold'
                    },
                    headerTitleAlign: 'left'
                }}>
                {() => <SettingScreen />}
            </Stack.Screen>
            <Stack.Screen
                name="ItemDetail"
                component={ItemDetailComponent}
                options={{
                    title: "",
                    headerTitleAlign: 'left',
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
                }}>
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function OpenSettingScreen(navigation) {
    navigation.navigate('Setting');
}

export default MyPageStack;
