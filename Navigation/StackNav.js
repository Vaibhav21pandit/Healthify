import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login';
// import Home from '../Screens/Home';
import TabNav from './TabNav';
const Stack = createStackNavigator();


export default function StackNavigator(){
    return(
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Home' component={TabNav} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}