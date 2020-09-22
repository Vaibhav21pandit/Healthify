import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login';
import Dump from '../Screens/Dump'
import TabNav from './TabNav';
const Stack = createStackNavigator();


export default function StackNavigator(){
    return(
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Home' component={TabNav} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Dump' component={Dump} />
        </Stack.Navigator>
    )
}