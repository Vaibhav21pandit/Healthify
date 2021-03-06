import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet,Dimensions, Image , TouchableOpacity,Button, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { FlatList, RectButton } from 'react-native-gesture-handler';
import axios from 'axios'
import {useNavigation} from "@react-navigation/native"

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = `5f5fb88d7a86563816d9881e`;
const profilePicture = 'https://images.unsplash.com/photo-1532384661798-58b53a4fbe37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' 

const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

function Header(props){
  const navigation=useNavigation();
  return(
    <View style={styles.header}>
      <Icon name='keyboard-backspace' size={25} color='black' onPress={()=> navigation.navigate('Home')} />
      <Text style={{fontWeight:'bold'}}>Muscle_Mason_Gym</Text>
      <IonIcon name='settings-sharp' size={25} style={{marginRight:5}} color='black' onPress={()=>navigation.navigate('Settings')} />
    </View>
  )
}

export default function Profile({navigation}) {
  const [userPosts,setuserPosts]=useState(null)
  const [ActiveTab,setActiveTab]=useState(true)

  getUserData=()=>{
    axios.get(`${BASE_URL}/user`, { headers: { 'app-id': APP_ID } })
          .then(({ data }) => setuserPosts(data.data))
          .catch(console.error)
          .finally(() => console.log('Posts Loaded!!!'))
  }

  useEffect(()=>{getUserData()},[])

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <View>
        <Header/>
      </View>
      <View style={{flexDirection:'row',paddingHorizontal:5,backgroundColor:'white'}}>
        <View style={{flex:1}}>
          <Image source={{uri:profilePicture}} style={styles.profileImage} />
        </View>
        <View style={{flex:3,flexDirection:'row',justifyContent:'space-around',alignItems:'flex-end'}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>201</Text>
            <Text style={{color:'gray'}}>Followers</Text>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>  
            <Text style={{fontWeight:'bold',fontSize:20}}>350</Text>
            <Text style={{color:'gray'}}>Karma</Text>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>15</Text>
            <Text style={{color:'gray'}}>Posts</Text>
          </View>
        </View>
      </View>
      
      <View>
          <Text style={{margin:10,fontWeight:'bold'}}>
            Pumping Iron!!!
          </Text>
      </View>

      <View style={{flexDirection:'row'}}>  
        <TouchableOpacity style={styles.editProfileButton} >
          <Text>EDIT PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileSettings} onPress={()=>navigation.navigate('Settings')}>
          <IonIcon name='ios-settings-outline' size={15} />
        </TouchableOpacity>
      </View>

                                              {/* Part 2 */}
      
      <View>
        <View style={styles.profileTabs}>
            <View>
              <RectButton style={styles.postsTab}>
                <IonIcon name={ActiveTab? 'person':'person-outline'} size={24} style={{padding:5}} onPress={()=> setActiveTab(!ActiveTab)}  />
              </RectButton>
            </View>
            <View>
              <RectButton style={styles.savedTab}>
                <IonIcon name={ActiveTab?'ios-download-outline':'ios-download'} size={24} style={{padding:5}} onPress={()=> setActiveTab(!ActiveTab)} />
              </RectButton>
            </View>
        </View>
        <View style={{alignItems:'center',justifyContent:'space-around'}}>
          {userPosts==null ?  <ActivityIndicator color='#00ff00' size='large' />
          :<FlatList
            numColumns={3}
            data={userPosts}
            // pagingEnabled={true}
            // contentContainerStyle={{flex:1}}
            renderItem={({item}) => {
              return(
                <View>
                  <Image resizeMode="contain" source={{uri:item.picture}} style={{marginHorizontal:2,marginTop:5,height:200,width:115}} />
                </View>
              )
            }}          
          />}
          {/* {userPosts!=null && <FlatList
            numColumns={3}
            data={userPosts}
            renderItem={({item}) => {
              <Image source={{uri:item.picture}} style={styles.carousel} />
            }}          
          />} */}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    width:windowWidth,
    height:55,
    alignItems:'center',
    justifyContent:'space-between',
    shadowOffset:{width:0,height:10},
    shadowRadius:11,
    shadowColor:"#000",
    elevation:55,
    backgroundColor:'ghostwhite'
  },

  headerText:{
    fontSize:25,
    fontWeight:'bold'
  },

  profileImage:{
    width:75,
    height:75,
    borderRadius:50,
    marginTop:15
  },

  editProfileButton:{
    flex:3,
    // backgroundColor:'grey',
    width:100,
    height:25,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'grey',
    borderRadius:15,
    borderWidth:2,
    marginVertical:10,
    marginHorizontal:5,

  },
  profileSettings:{
    flex:1,
    marginHorizontal:5,
    // backgroundColor:'grey',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'grey',
    borderRadius:15,
    borderWidth:2,
    marginVertical:10
  },
  profileTabs:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'white',
    elevation:5,
    shadowColor:'grey',
    shadowRadius:25,
  },
  postsTab:{
    flex:1,
    borderBottomColor:'black',
    borderWidth:3,
    borderColor:'black'
  },
  savedTab:{
    borderBottomColor:'black',
    borderBottomWidth:0
  }

})


