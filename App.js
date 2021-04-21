import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './components/Map';
import SavePlace from './components/SavePlace';
import BerryPlaces from './components/BerryPlaces';
import Help from './components/Help';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Save new place" component={SavePlace} />
        <Stack.Screen name="Berry places" component={BerryPlaces} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
