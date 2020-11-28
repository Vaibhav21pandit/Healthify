import React,{Component} from 'react';
import {View,Text,FlatList,Image,Dimensions,StyleSheet,Button,LayoutAnimation,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'
import SplashScreen from './SplashScreen'
import {useNavigation} from '@react-navigation/native'


const RNFS=RNFetchBlob.fs;
const profilePicture = 'https://images.unsplash.com/photo-1532384661798-58b53a4fbe37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' 
const APIkey='pkYXCJNrEuxIR5gl15VI6_HfR1ecgKq2NwKLkiOzd2M';
const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const ImageData=[
  {key:'1',download_url:'https://images.unsplash.com/photo-1571726656333-2640ca759d22?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Z3ltbmFzdHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60',author:'HealthFreak11',caption:"Getting Buff at the Gym,I remember coming in here for the first Time."},
  {key:'2',download_url:'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',author:'LovelyLeslie',caption:"Berty Has been A good Mentor to me,I owe him a lot for all my gains."},
  {key:'3',download_url:'https://images.unsplash.com/photo-1521805492803-3b9c3792c278?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',author:'GymLover36',caption:"Gym just felt like my home,This journey has been nothing but inspiring."}
];

// const captions=[
//   "Getting Buff at the Gym,I remember coming in here for the first Time.",
//   "Berty Has been A good Mentor to me,I owe him a lot for all my gains.",
//   "Gym just felt like my home,This journey has been nothing but inspiring."
// ]

export function Header(){
  const navigation=useNavigation();
  return(
    <View style={{backgroundColor:'cream',height:45,width:windowWidth,alignItems:'center',justifyContent:'space-between',flexDirection:'row',elevation:5}}>
      {/* <Image source={require('../src/assets/dumbbells.jpeg')} style={{height:35,width:60,paddingLeft:3}}/> */}
      <Text style={{fontWeight:'bold',fontFamily:'lucida-grande',fontSize:25,marginLeft:10}}>Mazzaa</Text>
      {/* <IonIcon name='person' size={30} color='black' style={{paddingRight:5}} onPress={()=>navigation.navigate('Profile')} /> */}
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
        <Image source={{uri:profilePicture}} style={{height:30,width:30,borderRadius:20, marginRight:10}}  />
      </TouchableOpacity>
    </View>
  )
}

// const AvatarData={
//   HealthFreak11:'https://images.unsplash.com/photo-1583951290243-970177c6277d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//   LovelyLeslie:'https://images.unsplash.com/photo-1593440497401-b87d3bb3fb8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//   GymLover36:'https://images.unsplash.com/photo-1597750955232-b6040c843cf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
// };

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      heartColor:'rgba(0,0,0,0.2)',
      poopColor:'rgba(0,0,0,0.2)',
      images:[],
      // imagePath:'',
      isLoading:false 
    }
  }

  loadWallpapers=async ()=>{
    try{
    ImageList=await axios.get(`https://picsum.photos/v2/list?limit=3`)
    this.setState({images:ImageList.data})
    // console.log(ImageList)
    } 
    catch(err){
      console.log(err)
    }
    this.setState({isLoading:false})
  }

  shareImage(ImageURL,type){
    let filePath=null;
    RNFetchBlob.config({fileCache:true})
    .fetch('GET',ImageURL)
    .then(resp=>{
      filePath=resp.path();
      console.log(ImageURL);
      return resp.readFile('base64')
    })
    .then(async base64data=>{
      base64data=`data:${type};base64,`+base64data;
      await Share.open({message:'Download Mazzaa app today!',url:base64data})
      await RNFS.unlink(filePath)
    })
    
  }

  // componentDidMount(){
  //   setTimeout((async()=>this.loadWallpapers()),1000)    
  // }

  // componentDidMount(){
  //   setTimeout(()=>this.setState({isLoading:false}),1000)
  // }
  _renderItem=({item})=>{
    return(
      <View style={styles.homeScreen}>
        <View style={styles.postHeader}>
          <Image style={styles.avatar} source={{uri:item.download_url}} />
          <Text style={styles.usernameText}>{item.author}</Text>
          <Icon name='dots-vertical' style={styles.postHeaderIcon} color='black' size={35} onPress={()=>alert(`${item.author} posted this shit`)} />
        </View>

        <Image style={styles.postImage} source={{uri:item.download_url}} />

        <View style={styles.postFooter}>
          <View style={styles.postFooterIconTray}>
            <Icon name='heart' size={35} onPress={()=>this.setState({heartColor:'red'})} color={this.state.heartColor} style={styles.postFooterIcon} />
            {/* <Icon name='emoticon-poop' size={35} onPress={()=>this.setState({poopColor:'#a52a2a'})} color={this.state.poopColor} style={styles.postFooterIcon}  /> */}
            <Icon name='whatsapp' size={35} color='green' style={styles.postfooterShare} onPress={()=>{this.shareImage(item.download_url,'image/jpeg')}}/>
          </View>
          <View style={styles.footerContent}>
            <Text numberOfLines={5}  style={styles.postFooterComment}>
            <Text style={styles.footerCaption}>{`${item.author}`}</Text>{`${item.caption}`}</Text>
          </View>
        </View>
      </View>
    )
  }

  render()
  {
    LayoutAnimation.easeInEaseOut();
    
    return(
      this.state.isLoading ?
      <SplashScreen/> :
      (     
     <View style={{flex:1}}>
       <Header />
        {/* <Button title='logout' color='blue' style={{height:25,width:25,position:'absolute',right:15,bottom:15}} onPress={()=>auth().signOut()} /> */}
        {/* <Icon name='logout' onPress={()=>auth().signOut()} style={{position:'absolute',right:305,bottom:55}} size={45} color='indigo' /> */}
        <FlatList
          data={ImageData}
          initialNumToRender={8}
          // onEndReachedThreshold={}
          renderItem={(item)=>this._renderItem(item)}
          />
      </View>
    )
    )
}
}


const styles = StyleSheet.create({
  homeScreen:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  postHeader:{
    height:55,
    width:windowWidth,
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
    elevation:8
  },  
  usernameText:{
    color:'black',
    fontWeight:'bold',
    fontSize:15,
    paddingHorizontal:5

  },
  postImage:{
    width:windowWidth,
    height:300
  },
  avatar:{
    height:30,
    width:30,
    borderRadius:10000,
    paddingHorizontal:25
  },
  postHeaderIcon:{
    position:'absolute',
    right:4
  },
  postFooter:{
    height:200,
    width:windowWidth,
    backgroundColor:'white',
    justifyContent:'flex-start'
  },
  postFooterIconTray:{
    flexDirection:'row',
    elevation:5

  },

  postFooterIcon:{
    paddingHorizontal:5,
    paddingVertical:10
  },
  postfooterShare:{
    position:"absolute",
    right:windowWidth/35,
    top:windowHeight/70
  },

  footerContent:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:3
  },

  footerCaption:{
    fontWeight:'bold',
    paddingHorizontal:6,
    paddingVertical:5,
    fontSize:15,
    marginHorizontal:5
  },
  postFooterComment:{
    fontSize:16,
    paddingVertical:6,
    paddingRight:3,
  }
})

{/*
Since we can only fetch images from the Picsum API right now,doing both video and images isn't feasible,
Also the right way is to determine the type of data we've fetched and then render it accordingly:
eg- if(item.type=='Video'){return <Video Yada Yada />}
    else return <Image Yada Yada />
makes me wonder how much delay will this add to the render time of the app.
*/}