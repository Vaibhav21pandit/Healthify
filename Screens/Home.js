import React,{Component} from 'react';
import {View,Text,FlatList,Image,Dimensions,StyleSheet,Button,LayoutAnimation} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'
import SplashScreen from './SplashScreen'
 
const RNFS=RNFetchBlob.fs;
const APIkey='pkYXCJNrEuxIR5gl15VI6_HfR1ecgKq2NwKLkiOzd2M';
const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;

const ImageData=[
  {key:'1',imageURI:{uri:'https://images.unsplash.com/photo-1597871761588-97ebfda1eb5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},userName:'HealthFreak11'},
  {key:'2',imageURI:{uri:'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},userName:'LovelyLeslie'},
  {key:'3',imageURI:{uri:'https://images.unsplash.com/photo-1521805492803-3b9c3792c278?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},userName:'GymLover36'}
];

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
      imagePath:'',
      isLoading:true    
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

  componentDidMount(){
    setTimeout((async()=>this.loadWallpapers()),3000)    
  }

  _renderItem=({item})=>{
    return(
      <View style={styles.homeScreen}>
        <View style={styles.postHeader}>
          <Image style={styles.avatar} source={{uri:item.download_url}} />
          <Text style={styles.usernameText}>{item.author}</Text>
          <Icon name='dots-vertical' style={styles.postHeaderIcon} color='white' size={35} onPress={()=>alert(`${item.author} posted this shit`)} />
        </View>

        <Image style={styles.postImage} source={{uri:item.download_url}} />

        <View style={styles.postFooter}>
          <View style={styles.postFooterIconTray}>
            <Icon name='heart' size={35} onPress={()=>this.setState({heartColor:'red'})} color={this.state.heartColor} style={styles.postFooterIcon} />
            <Icon name='emoticon-poop' size={35} onPress={()=>this.setState({poopColor:'#a52a2a'})} color={this.state.poopColor} style={styles.postFooterIcon}  />
            <Icon name='whatsapp' size={35} color='green' style={styles.postfooterShare} onPress={()=>{this.shareImage(item.download_url,'image/jpeg')}}/>
          </View>
          <View style={styles.footerContent}>
            <Text style={styles.footerCaption}>{`${item.author}`}</Text>
            <Text numberOfLines={3}  style={styles.postFooterComment}>Getting Buff at the Gym,I remember the first time I set foot in here and felt like home.Thanks to this Journey It's been so inspiring</Text>
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
        <Button title='logout' color='blue' style={{height:25,width:25,position:'absolute',right:15,bottom:15}} onPress={()=>auth().signOut()} />
        {/* <Icon name='logout' onPress={()=>auth().signOut()} style={{position:'absolute',right:305,bottom:55}} size={45} color='indigo' /> */}
        <FlatList
          data={this.state.images}
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
    backgroundColor:'indigo',
    alignItems:'center',
    elevation:8
  },  
  usernameText:{
    color:'white',
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
    borderRadius:50,
    paddingHorizontal:25
  },
  postHeaderIcon:{
    position:'absolute',
    right:4
  },
  postFooter:{
    height:300,
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
    alignItems:'baseline'
  },

  footerCaption:{
    fontWeight:'bold',
    paddingHorizontal:6,
    paddingVertical:5,
    fontSize:15
  },
  postFooterComment:{
    fontSize:12,
    paddingVertical:6,
    paddingRight:3
  }
})

{/*
Since we can only fetch images from the Picsum API right now,doing both video and images isn't feasible,
Also the right way is to determine the type of data we've fetched and then render it accordingly:
eg- if(item.type=='Video'){return <Video Yada Yada />}
    else return <Image Yada Yada />
makes me wonder how much delay will this add to the render time of the app.
*/}