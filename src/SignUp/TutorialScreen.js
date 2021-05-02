import React from "react";
import {
    View,
    StyleSheet,
    Image,
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
        <View animationType="fade" transparent={true} visible={props.visible}
            style={{justifyContent : 'center', alignItems : 'center'}}>
            <TouchableOpacity style={styles.modalBackground}>
                <Image style={styles.popupImage}
                    source={Images[0]}>
                </Image>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
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