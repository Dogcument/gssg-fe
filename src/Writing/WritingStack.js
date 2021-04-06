import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Image } from 'react-native';

// scene components
import WritingPrepareScreen from './WritingPrepareScreen';
import { WritingScreen, OnDoneButtonClicked } from './WritingScreen';

const Stack = createStackNavigator();

const WritingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WritingPrepareScreen"
                component={WritingPrepareScreen}
                options={{
                    title: '제시어 주는곳',
                    headerTitleStyle: {
                        fontFamily: 'topbar'
                    }
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
                            onPress={() => OnDoneButtonClicked()}
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