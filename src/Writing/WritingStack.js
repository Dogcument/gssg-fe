import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';

// scene components
import { WritingPrepareScreen } from './WritingPrepareScreen';
import { WritingScreen, OnDoneButtonClicked } from './WritingScreen';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/core';
import { AnimalPawBlackImg, BackButtonImg } from '../../assets/Images';

const Stack = createStackNavigator();

// The navigation(parameter) must be used in "OnDoneButtonClicked" function only.
function WritingStack({navigation}) {
    const WritingPrepareScreenComponent = () => <WritingPrepareScreen
        navigation={useNavigation()}
    />
    const WritingScreenComponent = ({ route }) => <WritingScreen
        subject={route.params.subject}
        navigation={useNavigation()}
    />

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WritingPrepareScreen"
                component={WritingPrepareScreenComponent}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="WritingScreen"
                component={WritingScreenComponent}
                options={{
                    title: "Brrraaaah",
                    headerTitleStyle: {
                        fontFamily: 'title',
                        fontSize : 25
                    },
                    headerTitleAlign : 'center',                    
                    headerRight: () => (
                        <HeaderButtons>
                            <TouchableOpacity
                                onPress={() => OnDoneButtonClicked(navigation)}>
                                <Image
                                    source={AnimalPawBlackImg}
                                    style={{ width: 20, height: 20, marginRight: 20 }} />
                            </TouchableOpacity>
                        </HeaderButtons>
                    ),
                    headerBackTitleVisible: false,
                    headerBackImage: () =>
                        <Image
                            style={{ marginLeft: 20, width: 20, height: 20 }}
                            source={BackButtonImg}>
                        </Image>
                }}
            />
        </Stack.Navigator>
    );
};

export default WritingStack;