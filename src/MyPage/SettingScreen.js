import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function IsWritingKey(key) {
    return !(key == "Nickname" || key == "Comment");
}
export class SettingScreen extends React.Component {

    DeleteNicknameAndComment = async () => {
        const nicknameKey = await AsyncStorage.getItem("Nickname");
        if (nicknameKey != null) {
            AsyncStorage.removeItem(nicknameKey);
        }

        const commentKey = await AsyncStorage.getItem("Comment");
        if (commentKey != null) {
            AsyncStorage.removeItem(commentKey);
        }

        alert("닉네임과 Comment가 초기화 되었습니다.");
    }

    DeleteWritings = async () => {
        const keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            if (!IsWritingKey(keys[i])) {
                continue;
            }
            AsyncStorage.removeItem(keys[i]);
        }

        alert("작성한 글 들이 초기화 되었습니다.");
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.DeleteNicknameAndComment()}>
                    <Text>
                        초기화 Nickname / Comment
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.DeleteWritings()}>
                    <Text>
                        작성한 글 초기화
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
