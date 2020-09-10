import React,{Component} from 'react';
import {View ,Text, Image, Button,StyleSheet, Keyboard,TextInput, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Entypo from 'react-native-vector-icons/Entypo'
import { v4 as uuidv4 } from 'uuid';


export default class Upload extends Component{
  constructor(props){
    super(props);
    this.state={
        avatarSource:null,
        imageSource:''
    }
    this.options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality:0.6
      },
    };
  }

  uploadImageFirebase=async() => {
    // const imageUploadId = Math.random().toString();
    const reference=storage().ref('HiThereBoiz.jpg');
    try{
    await reference.putFile(this.state.imagePath)
    }
    catch(err){
      console.log(err)}
    alert('Uploaded');
  }

  ChooseImage=async (options)=>{
    ImagePicker.showImagePicker(options, (response) => {

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
        imagePath: response.path,
        });
      }
    }); 
  }

  render(){
    if(this.state.avatarSource==null){
      return (
        <View style={styles.Container}>
          <Entypo name='upload' color='indigo' size={45} onPress={() => this.ChooseImage(this.options)} />
        </View>
      )
    }
    else return(
        <KeyboardAvoidingView style={styles.Container}>
            <Image source={{uri:this.state.avatarSource}} style={styles.Image} />
            <TextInput placeholder='Input Caption' numberOfLines={2} maxLength={255} keyboardType='twitter'  />
            <Button title='Upload' onPress={()=> {this.uploadImageFirebase()}}/>
      </KeyboardAvoidingView>
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