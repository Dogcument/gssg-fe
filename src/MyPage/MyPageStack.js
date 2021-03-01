import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from "@react-navigation/native";
import MyPageScreen from './MyPageScreen';

const Stack = createStackNavigator();

function MyPageStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyPage"
                component={() => <MyPageScreen navigation={useNavigation()} />}
                options={{
                    title: "마이페이지",
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <HeaderButtons>
                            <Item
                                title="종"
                                onPress={() => alert("종")}
                            />
                            <Item
                                title="톱니"
                                onPress={() => alert("톱니")}
                            />
                        </HeaderButtons>
                    )
                }}
            />
        </Stack.Navigator>
    );
}

export default MyPageStack;
