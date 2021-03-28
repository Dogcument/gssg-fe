import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './Styles';

export class MyPageProfile extends React.Component {
    render() {
        return (
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImageStyle}
                    source={require('./Images/3_Profile.png')} />
                <View style={styles.profileView}>
                    <Text style={{fontFamily : 'topbar'}}>
                        아이디
                    </Text>
                    <Text style={{fontFamily : 'topbar'}}>
                        간단한 소개
                    </Text>
                </View>
            </View>
        );
    }
}