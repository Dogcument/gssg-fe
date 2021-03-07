
import * as React from 'react';
import { Text } from 'react-native';

export class CabinetItemDetail extends React.Component {
    render() {
        return (
            <Text>
                작성시간 : {this.props.writingTime}  내용 : {this.props.content}
            </Text>
        )
    }
}