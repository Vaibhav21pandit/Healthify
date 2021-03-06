import React,{Component,useState,useEffect} from 'react';
import {View,Text,FlatList,Image,Dimensions,StyleSheet, InteractionManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {StackNavigator} from './Navigation/StackNav'
import auth from '@react-native-firebase/auth';
import Login from './Screens/Login'
import TabNav from './Navigation/TabNav'
export default function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Login />
    );
  }

  return(
    <NavigationContainer >
        <TabNav />
    </NavigationContainer>
  )
}