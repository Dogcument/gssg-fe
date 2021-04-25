import React from "react";
import {
    Modal,
    TouchableHighlight,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

const Popup = props => {
    return (
        <Modal animationType="fade" transparent={true} visible={props.visible}
            style={{justifyContent : 'center', alignItems : 'center'}}>
            <TouchableOpacity style={styles.modalBackground}>
                <Image style={styles.popupImage}
                    source={require('./Images/Pop_up_5.png')}>
                </Image>
            </TouchableOpacity>
        </Modal>
    );
};
export default Popup;

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