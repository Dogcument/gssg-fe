import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    box: {
        height: 200,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#110000'
    },

    contents: {
        height: '100%',
        flex: 0.75,
        flexDirection: 'row',
        backgroundColor: '#00ff00'
    },

    profile: {
        height: '100%',
        flex: 0.25,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },

    blank: {
        height: 30,
        width: '100%'
    },

    boxText: {
        color: '#000',
        fontWeight: 'bold'
    }
});

export default styles;