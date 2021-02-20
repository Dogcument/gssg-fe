import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen } from './CabinetScreen';

const Stack = createStackNavigator();

function CabinetStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cabinet"
                component={CabinetScreen}
                options={{
                    title: "보관함",
                    headerTitleAlign: 'left',
                }}
            />
        </Stack.Navigator>
    );
}

export default CabinetStack;
