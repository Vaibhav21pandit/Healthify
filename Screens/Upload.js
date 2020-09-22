import React, { Component } from 'react';
import {View,Text,PermissionsAndroid, Image,ScrollView, StyleSheet,Dimensions, ActivityIndicator,TouchableWithoutFeedback} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import Entypo from 'react-native-vector-icons/Entypo'
import Video from 'react-native-video';

const windowHeight=Dimensions.get('window').height
const windowWidth=Dimensions.get('window').width

export default class Dump extends Component{
  constructor(props){
    super(props);
    this.state={
      ImageArray:null,
      displayImage:null,
      type:null
    }
  }
    
  hasAndroidPermission= async() => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  GetPhotos=async()=>{
    const photoOptions={
      first:25
    }
      CameraRoll.getPhotos(photoOptions)
      .then(r=>{this.setState({ImageArray:r.edges}),console.log(r.edges)})
      .catch(err => console.log(err))
      .finally(console.log(this.state.ImageArray))    
  }

  componentDidMount(){
    this.GetPhotos()
  }

  render(){
  if (this.state.ImageArray!=null){ 
    return(
    <View style={styles.container}>
      <View style={styles.uploader}>
        {(this.state.displayImage==null) && <Entypo name='upload' color='indigo' size={45} />}
        {(this.state.displayImage!=null && this.state.type=='image/jpeg') && <Image resizeMode='contain' style={{width:300,height:300}} source={{uri:this.state.displayImage}} />}
        {(this.state.displayImage!=null && this.state.type=='video/mp4') && <Video  resizeMode='contain' volume={0.6} source={{uri:this.state.displayImage}} style={{width:300,height:300}} />}
      </View>
      <View style={styles.scroller} >
        <ScrollView horizontal={true}>
          {this.state.ImageArray.map((p, i) => {
          return (
            <View>
              <TouchableWithoutFeedback onPress={()=>this.setState({displayImage:p.node.image.uri,type:p.node.type})}>
                <Image
                  key={i}
                  style={styles.photos}
                  source={{ uri: p.node.image.uri }}
                  resizeMode='cover'
                />
              </TouchableWithoutFeedback>
            </View>       
          );
          })}
        </ScrollView>
      </View>
    </View>
  )
}
    else{
      return(
        <View>
          <ActivityIndicator />
        </View>
    )
      }
}
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'beige'
  },
  uploader:{
    flex:3,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  scroller:{
    flex:1,
    alignItems:'flex-end',
    justifyContent:'flex-end'
  },
  photos:{
    flex:1,
    width:windowWidth/3 ,
    height: windowHeight/9,
    marginHorizontal:5,
    borderColor:'grey',
    borderRadius:5,
    borderWidth:2
  }
})