import * as React from 'react';
import { Text, View } from 'react-native';
import { styles } from './Styles';

export class CabinetItemDetail extends React.Component {
    render() {
        return (
            <View>
                <Text style={{
                    fontSize: 10,
                    justifyContent : 'flex-end'
                }}>
                    작성시간 : {this.props.writingTime}
                </Text>
                <View style={styles.DetailContent}>
                    <Text>
                        내용 : {this.props.content}
                    </Text>
                </View>
                <View style={styles.DetailtProfile}>
                    프로필
                </View>
            </View>
        )
    }
}