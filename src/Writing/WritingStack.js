import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';

// scene components
import WritingPrepareScreen from './WritingPrepareScreen';
import { WritingScreen, OnDoneButtonClicked } from './WritingScreen';
import { HeaderButtons } from 'react-navigation-header-buttons';

const Stack = createStackNavigator();

const WritingStack = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WritingPrepareScreen"
                component={WritingPrepareScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="WritingScreen"
                component={WritingScreen}
                options={{
                    title: '',
                    headerRight: () => (
                        <HeaderButtons>
                            <TouchableOpacity
                                onPress={() => OnDoneButtonClicked(navigation)}>
                                    <Image
                                        source={require('../Common/Images/animal-paw-print.png')}
                                        style={{ width : 20, height : 20, marginRight : 20}}/>
                                </TouchableOpacity>
                        </HeaderButtons>
                    ),
                    headerBackTitleVisible: false,
                    headerBackImage: () =>
                        <Image
                            style={{ marginLeft: 20, width: 20, height: 20 }}
                            source={require('../Main/Images/BackButton.png')}>
                        </Image>
                }}
            />
        </Stack.Navigator>
    );
};

export default WritingStack;