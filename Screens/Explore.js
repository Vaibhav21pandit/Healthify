//Profile.js 
import React from 'react';
import { View,Text,Button ,FlatList, Image,StyleSheet,Dimensions} from 'react-native';
import axios from 'axios'
import SplashScreen from './SplashScreen'
import {useNavigation} from '@react-navigation/native'

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = `5f5fb88d7a86563816d9881e`;
const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

export default class Profile extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isLoading:false,
      Data:null,
      User:null,
    }
  }

  getUserData=()=>{
    this.setState({isLoading:true})
    axios.get(`${BASE_URL}/user`, { headers: { 'app-id': APP_ID } })
          .then(({ data }) => this.setState({Data:data.data}))
          .catch(console.error)
          .finally(() => {this.setState({isLoading:false})}) 
  }

  //this.setState({isLoading:false})

  componentDidMount(){
    this.getUserData()
  }
  render(){
  if(this.state.isLoading === true){
    return(<SplashScreen />) 
  }    
  else {
    return(
      <View>
        <FlatList
        // pagingEnabled={true}
        
        data={this.state.Data}
        numColumns={3}
        initialNumToRender={6}
        renderItem={({item})=>{
          return(
            <View>
              {/* <Text>{item.lastName}</Text> */}
              <Image source={{uri:item.picture}} style={styles.carousel} />
              {/* <Text>{item.id}</Text> */}
            </View>
          )
        }

        }
        />
      </View>
    )
  }
}
}
const styles = StyleSheet.create({
  carousel:{
    height:200,
    width:(windowWidth/3),
    borderColor:'white',
    borderWidth:5,
    resizeMode:'cover'
  },
})
