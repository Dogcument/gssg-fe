import * as React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../_Style/Styles';

function CabinetScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.box}>
          <View style={styles.contents}>
            <Text style={styles.boxText}>
              contents
            </Text>
          </View>
          <View style={styles.profile}>
            <Text style={styles.boxText}>
              profile
            </Text>
          </View>
        </View>
        <View style={styles.blank} />

        <View style={styles.box}>
          <View style={styles.contents}>
            <Text style={styles.boxText}>
              contents
            </Text>
          </View>
          <View style={styles.profile}>
            <Text style={styles.boxText}>
              profile
            </Text>
          </View>
        </View>
        <View style={styles.blank} />


        <View style={styles.box}>
          <View style={styles.contents}>
            <Text style={styles.boxText}>
              contents
            </Text>
          </View>
          <View style={styles.profile}>
            <Text style={styles.boxText}>
              profile
            </Text>
          </View>
        </View>
        <View style={styles.blank} />

      </View>

    </ScrollView>
  )
}

export default CabinetScreen; 
