import * as React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from './MyPageScreen';

const Stack = createStackNavigator();

function MyPageStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="마이페이지"
                component={MyPageScreen}
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => alert('설정화면으로 이동')}
                            title="톱니바퀴"
                            color="#00cc00"
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default MyPageStack;
