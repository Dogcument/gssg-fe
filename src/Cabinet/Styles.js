import { StyleSheet } from 'react-native';

// Dummy Style
// Jiwung TODO
export const styles = StyleSheet.create({
  ItemContainer: {
    backgroundColor: '#FFFFFF',
    width: '95%',
    height: 200,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ae9784',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: '2.5%',
    shadowColor: '#000000', shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 3,
  },
  ItemContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    flex: 3.5,
    marginTop: 5,
    justifyContent: 'center'
  },
  ItemProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1.5,
    flexDirection: 'row'
  },
  ItemText: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    fontFamily: 'SpoqaRegular',
    marginTop: 10, marginLeft: 10,
    width: '95%', textAlign: 'center'
  },
  profile: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  profileView: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  ImageStyle: {
    height: 50,
    width: 50,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    marginBottom: -100
    // resizeMode: 'stretch',
  },
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ae9784',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'SpoqaRegular'
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  }
}
);