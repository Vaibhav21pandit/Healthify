import React from 'react'
import {View,Text,Button,Image, DatePickerIOS} from 'react-native';
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
 
const RNFS=RNFetchBlob.fs;
export default class Inbox extends React.Component {
  constructor(){
      super();
      this.state={
        sharePath:'https://images.unsplash.com/photo-1599406682452-12614fce9f55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
      };
      
  }

  sharePDFWithAndroid(fileUrl, type) {  
    let filePath = null;
    let file_url_length = fileUrl.length;
    const configOptions = { fileCache: true };
    RNFetchBlob.config(configOptions)
      .fetch('GET', fileUrl)
      .then(resp => {
        filePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async base64Data => {
        base64Data = `data:${type};base64,` + base64Data;
        await Share.open({ title:'Hi',message:'Hey', url: base64Data });
        // remove the image or pdf from device's storage
        await RNFS.unlink(filePath);
      });
  }

  render(){
      return(
          <View>
              <Button title='Download' onPress={()=>this.sharePDFWithAndroid(this.state.sharePath,'image/jpeg')} />
          </View>
      )
  }
}
