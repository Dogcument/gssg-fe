import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Image } from 'react-native';

// scene components
import WritingPrepareScreen from './WritingPrepareScreen';
import { WritingScreen, OnDoneButtonClicked } from './WritingScreen';

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
                    title: '실제 글 싸는 곳',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontFamily: 'topbar'
                    },
                    headerRight: () => (
                        <Button
                            title="글쓰기"
                            onPress={() => OnDoneButtonClicked(navigation)}
                        />
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