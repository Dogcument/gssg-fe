import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './Styles';

export class MyPageProfile extends React.Component {
    render() {
        return (
            <View style={[styles.profileContainer]}>
                <Image
                    style={styles.profileImageStyle}
                    source={require('./Images/3_Profile.png')} />
                <View style={[styles.profileView, {marginLeft : 10}]}>
                    <View style={{flexDirection : 'row'}}>
                        <View style={{
                            backgroundColor : '#ae9784', height : 30, width : 3, marginRight : 10}}>
                        </View>
                        <View style={{flexDirection : 'column', justifyContent : 'center'}}>
                            <Text style={{ fontFamily: 'topbar' }}>
                                아이디
                            </Text>
                            <Text style={{ fontFamily: 'topbar' }}>
                                Follower
                            </Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'topbar', marginTop : 15 }}>
                        간단한 소개
                    </Text>
                </View>
            </View>
        );
    }
}