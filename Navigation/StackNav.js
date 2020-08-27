import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/Login';
import Home from '../Screens/Home';

const Stack = createStackNavigator();


export function StackNavigator(){
    return(
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}