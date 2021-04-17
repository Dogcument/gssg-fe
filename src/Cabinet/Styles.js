import { StyleSheet } from 'react-native';

// Dummy Style
// Jiwung TODO
export const styles = StyleSheet.create({
  ItemContainer: {
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
  ItemContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    flex : 3.5,
    marginTop : 5,
    justifyContent : 'center'
  },
  ItemProfile : {
    flexDirection : 'row',
    justifyContent : 'flex-start',
    flex : 1.5,
    flexDirection : 'row'
  },
  ItemText: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    fontFamily: 'SpoqaRegular',
    marginTop: 10, marginLeft: 10,
    width: '95%', textAlign : 'center'
  },
  profile : {
    flex : 2,
    justifyContent : 'flex-end'
  },
  profileView : {
    alignItems : 'flex-start',
    flexDirection : 'column',
    justifyContent : 'space-around'
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
    // resizeMode: 'stretch',
  }
}
);