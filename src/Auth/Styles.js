import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    SignInModal: {
        flexDirection: 'column',
        width: '90%',
        height: '25%',
        marginTop: '130%',
        marginLeft: '5%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.7,
        shadowOffset: {
          height: 7.5,
          width: 7.5,
        },
        shadowRadius: 25,
    },
    SignUpModal: {
        flexDirection: 'column',
        width: '95%',
        height: '25%',
        marginTop: '130%',
        marginLeft: '2.5%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.7,
        shadowOffset: {
          height: 7.5,
          width: 7.5,
        },
        shadowRadius: 25,
    },
    ModalButton: {
        height: 30,
        marginLeft: "40%",
        width: "20%",
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.7,
        shadowOffset: {
          height: 7.5,
          width: 7.5,
        },
        shadowRadius: 25,
    }
})