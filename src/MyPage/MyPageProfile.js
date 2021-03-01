import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Styles';

export class MyPageProfile extends React.Component {
    render() {
        return (
            <View
                style={styles.profileContainer}>
                <Text>
                    요호호 빡빡이 아져씨야
                </Text>
            </View>
        );
    }
}
