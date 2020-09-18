import React, { Component } from 'react';
import { View,Animated, Easing,StyleSheet,Image,Dimensions } from 'react-native';

const windowWidth=Dimensions.get('window')
const windowHeight=Dimensions.get('window')

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { spinAnim: new Animated.Value(0) }
  }

 componentDidMount(){
 Animated.loop(Animated.timing(
    this.state.spinAnim,
  {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true
  }
)).start();
 }

  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../src/assets/Logo.png')} />  
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}], position:'absolute',right:25,top:25}}
          source={require('../src/assets/bhau.png')} />
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',left:25,top:25 }}
          source={require('../src/assets/babu-real-head.png')} />
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',right:25,bottom:25 }}
          source={require('../src/assets/nawaz-haed.png')} />
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',left:25,bottom:25 }}
          source={require('../src/assets/rajpal-head.png')} />
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',left:25,bottom:205 }}
          source={require('../src/assets/sardar-khan-head.png')} />   
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',right:25,bottom:205 }}
          source={require('../src/assets/bramha-head.png')} /> 
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',left:125,bottom:505 }}
          source={require('../src/assets/abey-saale-head.png')} /> 
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',right:125,bottom:105 }}
          source={require('../src/assets/Bunty-sacred-games-head.png')} /> 
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',right:25,bottom:205 }}
          source={require('../src/assets/rajpal-head-funny.png')} /> 
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',left:25,bottom:405 }}
          source={require('../src/assets/bhadwi-aunty-head.png')} /> 
        <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',right:25,bottom:405 }}
          source={require('../src/assets/bramha-head.png')} /> 
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'indigo'
  },
  upperAnimationContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  lowerAnimationContainer:{
    flex:2
  },
  logoContainer:{
    flex:2,
    flexDirection:'row',
  },
  logo:{
    height:400,
    width:400,
    margin:10    
  }
})

{/*  */}



