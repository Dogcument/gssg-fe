import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './Styles';

export class CabinetItemDetail extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <Text style={{
                    fontSize: 10,
                    textAlign : 'right'
                }}>
                    작성시간 : {this.props.writingTime}
                </Text>
                <View style={{
                    flex: 9,
                    textAlign : 'center',
                    justifyContent : 'center'
                }}>
                    <Text style={{
                        fontFamily : 'content'
                    }}>
                        {this.props.content}
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image
                        style={[styles.ImageStyle, {marginLeft : 15, marginRight : 15}]}
                        source={require('./Images/3_Profile.png')} />
                    <View style={[styles.profileView], {flexDirection : 'row'}}>
                        <View style={{height : 40, width : 3, backgroundColor : '#ae9784', marginRight : 5}}>
                        </View>
                        <View style={{flexDirection : 'column', justifyContent : 'center', marginLeft : 5}}>
                            <Text style={{ fontFamily: 'topbar' }}>
                                아이디
                            </Text>
                            <Text style={{ fontFamily: 'topbar' }}>
                                간단한 소개
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
