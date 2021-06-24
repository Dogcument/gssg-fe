import React from "react";
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import { LogoImg, TutorialImgs } from "../../assets/Images"

const MAX_IMAGE_NUM = 5;
export class TutorialScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0
        }
    }

    ShowNextTutorial() {
        if (MAX_IMAGE_NUM == this.state.imageIndex) {
            this.props.GotoMainScreen();
            return;
        }

        this.setState({ imageIndex: this.state.imageIndex + 1 });
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <ImageBackground source={LogoImg} style={{ position: 'absolute', width: '100%', height: '100%' }} />
                <View style={{ width: '100%', height: '100%', backgroundColor: '#000000', opacity: 0.5 }} />
                <View style={styles.tutorialBackground}>
                    <TouchableOpacity
                        style={{ height: '100%', width: '100%' }}
                        onPress={() => this.ShowNextTutorial()}>
                        <Image style={styles.popupImage}
                            source={TutorialImgs[this.state.imageIndex]}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
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
        position: 'absolute',
        width: '80%',
        height: '65%',
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
        borderColor: '#d4d4d4',
        marginTop: '32.5%', marginLeft: '10%',
        borderRadius: 10
    },
    popupImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    }
});