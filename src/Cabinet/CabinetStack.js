import * as React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CabinetScreen } from './CabinetScreen';
import { CabinetItemDetail } from './CabinetItemDetail';
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';

const Stack = createStackNavigator();

function CabinetStack() {
    const CabinetComponent = () => <CabinetScreen navigation={useNavigation()} />
    const CabinetItemDetailComponent = ({ route }) => <CabinetItemDetail
        writingTime={route.params.writingTime}
        content={route.params.content} />

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cabinet"
                component={CabinetComponent}
                options={{
                    title: "보관함",
                    headerTitleStyle: {
                        fontFamily: 'SpoqaBold'
                    },
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <RNPickerSelect
                            onValueChange={(value) => console.log(value)}
                            items={[
                                { label: "테스트 Lavel", value: "테스트 Value" }
                            ]}
                        >
                        </RNPickerSelect>
                    )
                }}
            />
            <Stack.Screen
                name="CabinetItemDetail"
                component={CabinetItemDetailComponent}
                options={{
                    title: '',
                    headerTitleStyle: {
                        fontFamily: 'SpoqaBold'
                    },
                    headerTitleAlign: 'left',
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
}

export default CabinetStack;
