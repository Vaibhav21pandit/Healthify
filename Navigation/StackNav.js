import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login';
import Dump from '../Screens/Dump'
import Profile from '../Screens/Profile'
import Home from '../Screens/Home'

const Stack = createStackNavigator();

export default function StackNavigator(){
    return(
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='Dump' component={Dump} options={{headerShown:false}}/>
            <Stack.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}