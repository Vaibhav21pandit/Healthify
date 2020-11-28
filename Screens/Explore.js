//Profile.js 
import React from 'react';
import { View,Text,Button ,FlatList, Image,StyleSheet,Dimensions, TextInput} from 'react-native';
import axios from 'axios'
import SplashScreen from './SplashScreen'
import IonIcon from 'react-native-vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = `5f5fb88d7a86563816d9881e`;
const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

function Header(){
  return(
    <View style={styles.header}>
      {/* <Text style={styles.headerText}>Discover Users</Text> */}
      <TextInput placeholder='Search Users' placeholderTextColor='black' style={styles.InputBar}></TextInput>
      <IonIcon name='search-circle' size={40} style={styles.headerIcon}  />
    </View>   
  )
}


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
      <View style={styles.container}>
        <Header />
        <FlatList     
        data={this.state.Data}
        numColumns={3}
        initialNumToRender={6}
        renderItem={({item})=>{
          return(
            <View>
              <Image source={{uri:item.picture}} style={styles.carousel} />
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
  container:{
    flex:1,
    alignItems:'flex-start'
  },
  header:{
     width:windowWidth, 
     flexDirection:'row',
     height:55,
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:'ghostwhite',
     elevation:15,
     shadowColor:'gray',
     justifyContent:'space-between'
    },
  headerText:{
    fontWeight:'bold',
    fontSize:25,
  },
  headerIcon:{
    marginHorizontal:5
  },
  carousel:{
    flex:1,
    height:200,
    width:(windowWidth/3),
    borderColor:'white',
    borderWidth:5,
    resizeMode:'cover',
    
  },
  InputBar:{
    backgroundColor:'rgba(0,0,0,0.1)',
    height:30,
    borderRadius:10,
    alignItems:'center',
    textAlign:'center',
    marginVertical:10,
    width:windowWidth/2,
    height:40,
    marginHorizontal:10
  },
})
