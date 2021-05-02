import React from "react";
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity
} from "react-native";

const Images = [
    require('./Images/Pop_up_1.png'),
    require('./Images/Pop_up_2.png'),
    require('./Images/Pop_up_3.png'),
    require('./Images/Pop_up_4.png'),
    require('./Images/Pop_up_5.png'),
    require('./Images/Pop_up_6.png')
]

export const TutorialScreen = props => {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <ImageBackground source={require('../Logo/Images/1_Logo.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
            <View style={{ width : '100%', height : '100%', backgroundColor : '#000000', opacity : 0.5}} />
            <View style={styles.tutorialBackground}>
                <TouchableOpacity style={{ height : '100%', width : '100%' }}>
                    <Image style={styles.popupImage}
                        source={Images[0]}>
                    </Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        position: 'absolute',
        width: '80%',
        height: '20%',
        backgroundColor: '#FFFFFF',
        borderColor: '#d4d4d4',
        marginTop: '130%', marginLeft: '10%',
        borderRadius: 10
    },
    tutorialBackground: {
        position : 'absolute',
        width: '80%',
        height : '65%',
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
        borderColor: '#d4d4d4',
        marginTop: '32.5%', marginLeft: '10%',
        borderRadius: 10
    },
    popupImage : {
        resizeMode: 'contain',
        width : '100%',
        height : '100%'
    }
});