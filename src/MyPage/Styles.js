import { StyleSheet } from 'react-native';

// Dummy Style
// Jiwung TODO
export const styles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        height: 200,
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        alignItems: 'center',
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
        width: '100%',
        height: 80,
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5
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
    text: {
        color: 'white',
        fontFamily : 'content'
    }
});
