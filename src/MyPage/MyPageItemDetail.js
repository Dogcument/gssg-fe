import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './Styles';

export class MyPageItemDetail extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>

                <View style={{
                    flex: 9,
                    textAlign: 'center',
                    justifyContent: 'center',
                    width : '95%',
                    marginLeft : '2.5'
                }}>
                    <Text style={{
                        fontFamily: 'content'
                    }}>
                        {this.props.content}
                    </Text>
                    <Text style={{
                    fontSize: 10,
                    textAlign: 'center',
                    marginTop : 15,
                    fontFamily : 'content'
                }}>
                    {this.props.writingTime}
                </Text>
                </View>
                
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image
                        style={[styles.ImageStyle, { marginLeft: 15, marginRight: 15 }]}
                        source={require('./Images/3_Profile.png')} />
                    <View style={[styles.profileView], { flexDirection: 'row', flex : 1 }}>
                        <View style={{ height: 40, width: 3, backgroundColor: '#ae9784', marginRight: 5 }}>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 5 }}>
                            <Text style={{ fontFamily: 'topbar' }}>
                                아이디
                            </Text>
                            <Text style={{ fontFamily: 'topbar' }}>
                                간단한 소개
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Image style={{height : 20, width : 20, marginRight : 10 }}
                            source={require('./Images/7_Bone.png')}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={{height : 20, width : 20, marginRight : 10 }}
                            source={require('./Images/9_Chat.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
