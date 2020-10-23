import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Home from '../Screens/Home'
import Upload from '../Screens/Upload'
import Explore from '../Screens/Explore'
import StackNav from './StackNav'
const Tab=createBottomTabNavigator();

export default function BottomTabs(){
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Upload') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            else if (route.name==='Explore'){
                iconName=focused ? 'search-circle':'search-circle-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'indigo',
          inactiveTintColor: 'gray',
          activeBackgroundColor:'white',
          inactiveBackgroundColor:'white'
        }}
      >
            <Tab.Screen name='Home' component={StackNav} />
            <Tab.Screen name='Upload' component={Upload} />
            <Tab.Screen name='Explore' component={Explore} />
        </Tab.Navigator>
    );
}