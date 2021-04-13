import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './Styles';

export class MyPageProfile extends React.Component {
    render() {
        return (
            <View style={[styles.profileContainer]}>
                <View style={{ width: '90%', flexDirection: 'row', flex: 3, alignItems: 'center', marginLeft: '5%' }}>
                    <Image
                        style={[styles.profileImageStyle, { flex: 1 }]}
                        source={require('./Images/3_Profile.png')} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 3 }}>
                        <View style={{ flexDirection: 'column', alignItems : 'center', marginLeft : '10%' }}>
                            <Text style={{ fontFamily: 'SpoqaRegular', fontSize : 12, marginBottom : 5 }}>
                                Writing
                            </Text>
                            <Text style={{fontFamily : 'SpoqaMedium', fontSize : 20, fontWeight : 'bold'}}>
                                69
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems : 'center', marginRight : '10%' }}>
                            <Text style={{ fontFamily: 'SpoqaRegular', fontSize : 12, marginBottom : 5 }}>
                                Follower
                            </Text>
                            <Text style={{fontFamily : 'SpoqaMedium', fontSize : 20, fontWeight : 'bold'}}>
                                74
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width : ' 90%', marginLeft : '5%', flexDirection: 'column', flex: 2 }}>
                    <Text style={{ fontFamily: 'SpoqaBold', marginLeft: 10, fontSize : 13 }}>
                        3년차서당개
                    </Text>
                    <Text style={{ fontFamily: 'SpoqaRegular', marginLeft: 10, marginTop: 5, fontSize : 12 }}>
                        풍월 딱 대 ㅋㅋ
                    </Text>
                </View>

            </View>
        );
    }
}