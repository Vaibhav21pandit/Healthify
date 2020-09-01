import React,{Component} from 'react';
import {View ,Text, Image, Button,StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Entypo from 'react-native-vector-icons/Entypo'
// import { v4 as uuidv4 } from 'uuid';
import { utils } from '@react-native-firebase/app';

// const fs=require('fs');

export function Graphics(state){
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ChooseImage=async (options)=>{
    ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response.uri);
   
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
        // this.setState({imageSource:response.uri})
      const source = 'data:image/jpeg;base64,' + response.data 
      
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
   
      this.setState({
        avatarSource: source,
        imagePath: response.path
      });
    }
  }); 
}

  if(state='k'){
    return <Entypo name='upload' color='indigo' size={45} onPress={()=>ChooseImage(options)} />
  }
  return <Image source={{uri:state}} style={styles.Image} />
}

export default class Upload extends Component{
  constructor(props){
      super(props);
      this.state={
          avatarSource:'k',
          imageSource:'',
          imagePath:'',
      }
      // this.options = {
      //   title: 'Select Avatar',
      //   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      //   storageOptions: {
      //     skipBackup: true,
      //     path: 'images',
      //   },
      // };
  }

  downloadImageFirebase=async()=>{
    const reference = await storage().ref('Venkatesh.jpeg').getDownloadURL();
    console.log(reference)
    this.setState({imageSource:reference});
  }

  uploadImageFirebase=async() => {
    // const imageUploadId = Math.random().toString();
    const reference=storage().ref('HiThere.jpg');
    (await reference.putFile(this.state.imagePath)).error 
    .catch(Error =>{console.log(Error)})
    console.log('Uploaded');
  }


    // componentDidMount(){
    //     this.ChooseImage(this.options);
    //     this.downloadImageFirebase();
    // }
    render(){
        return(
            <View style={styles.Container}>
               <Graphics state={this.state.avatarSource}  />
                <Button title='Upload' onPress={()=> {this.uploadImageFirebase()}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  Image:{
    height:400,
    width:400
  }

})