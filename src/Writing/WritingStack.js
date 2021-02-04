import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// scene components
import WritingPrepareScreen from './WritingPrepareScreen';
import WritingScreen from './WritingScreen';

const Stack = createStackNavigator();

const WritingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WritingPrepareScreen"
                component={WritingPrepareScreen}
                options={{ title: '제시어 주는곳' }}
            />
            <Stack.Screen
                name="WritingScreen"
                component={WritingScreen}
                options={{ title: '실제 글 싸는 곳' }}
            />
        </Stack.Navigator>
    );
};

export default WritingStack;