import { StyleSheet } from 'react-native';

// Dummy Style
// Jiwung TODO
export const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 160,
    flexDirection: 'column',
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5,
    marginLeft : '2.5%'
  },
  content : {
    flex : 3,
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
    color: 'white',
    fontFamily : 'content'
  },
  subtext: {
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'column',
    color: 'white',
    fontFamily : 'content'
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 60,
    width: 60,
    // resizeMode: 'stretch',
  }
}
);