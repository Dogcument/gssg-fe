import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
                    style = {{ width : '90%', height : 50 }}
                    onPress={() => this.DeleteNicknameAndComment()}>
                    <Text style={{ fontFamily : 'SpoqaRegular', fontSize : 15}}>
                        초기화 Nickname / Comment
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {{ width : '90%', height : 50 }}
                    onPress={() => this.DeleteWritings()}>
                    <Text style={{ fontFamily : 'SpoqaRegular', fontSize : 15}}>
                        작성한 글 초기화
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
