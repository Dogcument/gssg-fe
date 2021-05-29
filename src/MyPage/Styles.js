import { StyleSheet } from 'react-native';

// Dummy Style
// Jiwung TODO
export const styles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        height: 300,
        padding : 10,
        flexDirection: 'column',
        backgroundColor : '#ae9784',
        borderWidth: 0.5, borderColor: '#ae9784',
        borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0,
        shadowColor : '#000000', shadowOpacity : 0.3, shadowOffset : {width : 2, height : 2}, shadowRadius : 3
    },
    profileImageStyle: {
        width : '60%'
    },
    profileView: {
        flex: 6,
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    itemContainer: {
        backgroundColor : '#FFFFFF',
        width: '95%',
        height: 50,
        flexDirection: 'row',
        borderColor : '#ae9784', borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: '2.5%',
        shadowColor : '#000000', shadowOpacity : 0.3, shadowOffset : {width : 2, height : 2}, shadowRadius : 3
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    ImageIconStyle: {
        height: 50,
        width: 50,
    },
    StackIconStyle: {
        height: 20,
        width: 20,
    },
    ImageStyle: {
        height: 50,
        width: 50,
    }
});
