import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { UserInfo } from '../Common/CommonMethod'
import { styles } from './Styles'
import { DogProfileImages } from '../Common/Dogs'

export class MyPageProfile extends React.Component {
    render() {
        const selectedDog = this.props.selectedDog;
        const userInfo = new UserInfo();
        return (
            <View style={[styles.profileContainer]}>
                <View
                    style={{ flexDirection: 'row', flex: 7.5, marginLeft : '2.5%', marginRight : '2.5%',
                             alignItems: 'center', justifyContent : 'space-around'}}>
                    <View style={{ flex: 2, flexDirection: 'column', alignItems : 'center' }}>
                        <Text style={{ fontFamily: 'SpoqaRegular', fontSize : 12, marginBottom : 5, color : '#FFFFFF' }}>
                            Writing
                        </Text>
                        <Text style={{fontFamily : 'SpoqaMedium', fontSize : 20, fontWeight : 'bold', color : '#FFFFFF' }}>
                            32
                        </Text>
                    </View>
                    <Image
                        style={[styles.profileImageStyle], {flex: 6}} resizeMode='contain'
                        source={DogProfileImages[selectedDog]} />
                    <View style={{ flex: 2, flexDirection: 'column', alignItems : 'center'}}>
                        <Text style={{ fontFamily: 'SpoqaRegular', fontSize : 12, marginBottom : 5, color : '#FFFFFF' }}>
                            Follower
                        </Text>
                        <Text style={{fontFamily : 'SpoqaMedium', fontSize : 20, fontWeight : 'bold', color : '#FFFFFF' }}>
                            19k
                        </Text>
                    </View>
                </View>
                <View style={{ width : ' 90%', marginLeft : '5%', marginTop : '7.5%', flexDirection: 'column', flex: 2.5, alignItems : 'center' }}>
                    <Text style={{ fontFamily: 'SpoqaBold', marginLeft: 10, fontSize : 20, color : '#FFFFFF' }}>
                        {userInfo.GetNickName()}
                    </Text>
                    <Text style={{ fontFamily: 'SpoqaRegular', marginLeft: 10, marginTop: 5, fontSize : 15, color : '#FFFFFF' }}>
                        {userInfo.GetComment()}
                    </Text>
                </View>

            </View>
        );
    }
}