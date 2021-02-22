import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    title : {
        fontSize : 30,
        fontFamily : 'BMEULJIROTTF',
    },

    textInput : {
        width : '90%',
        marginLeft : '5%',
        marginRight : '5%',
        textAlign : 'center',
        textAlignVertical: 'center',
        borderWidth : 0
    },

    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },

    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 60,
        width: 60,
        resizeMode: 'stretch',
    },

    TextInputStyle: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width : '90%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#009688',
    }
});
