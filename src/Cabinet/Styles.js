import { StyleSheet } from 'react-native';

// Dummy Style
// Jiwung TODO
export const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 200,
    flexDirection: 'column',
    borderWidth : 1,
    borderColor: '#ae9784',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
    marginLeft : '2.5%',
  },
  content : {
    flexDirection : 'row',
    justifyContent : 'flex-start',
  },
  profile : {
    flex : 2,
    justifyContent : 'flex-end'
  },
  text: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    fontFamily : 'content'
  },
  subtext: {
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'column',
    fontFamily : 'content'
  },
  profileView : {
    alignItems : 'flex-start',
    flexDirection : 'column',
    justifyContent : 'space-around'
  },
  ImageStyle: {
    height: 0,
    width: 50,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    // resizeMode: 'stretch',
  }
}
);