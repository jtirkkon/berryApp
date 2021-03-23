import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View} from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Text } from 'react-native-elements';
import{ Icon } from'react-native-elements';

function Help() {
  return (
    <View style={styles.container}>
      <Text>This is Helppage!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

  export default Help;