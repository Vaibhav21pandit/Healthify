import React,{Component} from 'react';
import {View ,Text, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';


export default class Upload extends Component{
  constructor(props){
      super(props);
      this.state={
          avatarSource:'',
      }
      this.options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
  }
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
      const source = { uri: 'data:image/jpeg;base64,' + response.data };

   
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
   
      this.setState({
        avatarSource: source.uri,
      });
    }
  });
}

    
    componentDidMount(){
        this.ChooseImage(this.options);
    }
    render(){
        return(
            <View>
                <Text>Hello There</Text>
                {/* <Text>{this.state.avatarSource}</Text> */}
                <Image source={{uri:this.state.avatarSource}} style={{height:300,width:300}}/> 
            </View>
        );
    }
}