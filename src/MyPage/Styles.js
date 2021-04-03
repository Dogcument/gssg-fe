import { StyleSheet } from 'react-native';

// Dummy Style
// Jiwung TODO
export const styles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        height: 200,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth : 1, borderColor: '#ae9784',
        borderRightWidth : 0, borderLeftWidth : 0, borderTopWidth : 0,
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5
    },
    profileImageStyle: {
        height: 180,
        width: 180,
    },
    profileView : {
        flex : 6,
        alignItems : 'flex-start',
        flexDirection : 'column',
        justifyContent : 'space-around'
    },
    itemContainer: {
        width: '95%',
        height: 50,
        borderRadius : 50,
        flexDirection: 'row',
        backgroundColor: '#ae9784',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: '2.5%'
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
    text: {
        color: 'white',
        fontFamily : 'content'
    }
});
