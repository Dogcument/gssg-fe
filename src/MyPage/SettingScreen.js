import * as React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { IsValidKey } from '../Common/CommonMethod';
export class SettingScreen extends React.Component {

    DeleteNicknameAndComment = async () => {
        const nicknameKey = await AsyncStorage.getItem("Nickname");
        if (nicknameKey != null) {
            AsyncStorage.removeItem("Nickname");
        }

        const commentKey = await AsyncStorage.getItem("Comment");
        if (commentKey != null) {
            AsyncStorage.removeItem("Comment");
        }

        alert("닉네임과 Comment가 초기화 되었습니다.");
    }

    DeleteWritings = async () => {
        const keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            if (!IsValidKey(keys[i])) {
                continue;
            }
            AsyncStorage.removeItem(keys[i]);
        }

        alert("작성한 글 들이 초기화 되었습니다.");
    }

    render() {
        return (
            <View style={{ alignItems : 'center', justifyContent : 'center', marginTop : 20}}>
                <TouchableOpacity
                    style = {{ width : '90%', height : 50, flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => this.DeleteNicknameAndComment()}>
                    <Image
                        source={require('../Writing/Images/1_WritingButton.png')}
                        style={{width: 25, height: 25}}/>
                    <Text style={{ marginLeft: 5, fontFamily : 'SpoqaBold', fontSize : 15}}>
                        초기화 Nickname / Comment
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {{ width : '90%', height : 50, flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => this.DeleteWritings()}>
                    <Image
                        source={require('../Writing/Images/1_WritingButton.png')}
                        style={{width: 25, height: 25}}/>
                    <Text style={{ marginLeft: 5, fontFamily : 'SpoqaBold', fontSize : 15}}>
                        작성한 글 초기화
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
