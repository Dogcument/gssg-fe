import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen } from './CabinetScreen';
import { CabinetItemDetail } from './CabinetItemDetail';
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

function CabinetStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cabinet"
                component={() => <CabinetScreen navigation={useNavigation()} />}
                options={{
                    title: "보관함",
                    headerTitleAlign: 'left',
                }}
            />
            <Stack.Screen
                name="CabinetItemDetail"
                component={({ route }) => <CabinetItemDetail
                    writingTime={route.params.writingTime}
                    content={route.params.content} />
                }
                options={{
                    title: "보관함 상세보기",
                    headerTitleAlign: 'left',
                }}
            />
        </Stack.Navigator>
    );
}

export default CabinetStack;
