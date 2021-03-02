import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from'react-native-elements';
import { Icon } from'react-native-elements';

function Home () {
  
  return (
    <View style={styles.container}>
       <Button icon={{name: 'save'}} title='SAVE' buttonStyle={{width: 200}}></Button>
       <Button icon={{name: 'save'}} title='SHOW MAP' buttonStyle={{width: 200}}></Button>
       <Button icon={{name: 'save'}} title='SHOW  SAVED PLACES' buttonStyle={{width: 200}}></Button>
       
       <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center', 
    paddingTop: 30
  },
});

export default Home;