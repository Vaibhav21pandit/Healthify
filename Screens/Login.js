import * as React from 'react';
import { Text, View, StyleSheet ,Button,ImageBackground,Dimensions,TextInput,Keyboard, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth';

const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;

// const ImageURL='https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80';
// const ImageURL='https://images.unsplash.com/photo-1560233026-ad254fa8da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=310&q=80'
const ImageURL='https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'

export default function Login({navigation}) {
  const [Email,setEmail]=React.useState('');
  const [Password,setPassword]=React.useState('');
  const SignupUser=(email,password)=>{
    auth()
  .createUserWithEmailAndPassword(email,password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }

  return (
    <KeyboardAvoidingView style={{flex:1}}>
    <ImageBackground source={{uri:ImageURL}} style={styles.container}>
      <Text style={styles.IconText}> Healthify </Text>
       
      <TextInput keyboardType='email-address' 
        placeholder='E-mail' 
        placeholderTextColor='white' 
        style={styles.InputBar} 
        onChangeText={(text)=>{setEmail(text)}} 
        value={Email} 
      />
      <TextInput secureTextEntry={true} 
        placeholder='Password' 
        placeholderTextColor='white' 
        style={styles.InputBar} 
        onChangeText={(text)=>{setPassword(text)}} 
        value={Password}  
      />
      <Button title='Login' 
        color='midnightblue' 
        style={styles.submitButton} 
        onPress={()=> {SignupUser(Email,Password),Keyboard.dismiss()}} 
        />
      <Text style={styles.normalText}>Social Login</Text>

      <View style={{flexDirection:'row',marginTop:50}}>
        <Text style={{color:'white'}}> Dont have an account yet?</Text>
        <Text style={{color:'dodgerblue',paddingHorizontal:3}} onPress={()=>console.log('Signup')}>Signup</Text>
      </View>

      <View style={styles.iconTray}>
        <Icon name="google" style={styles.trayIcons} size={24} color="cyan" />
        <Icon name="facebook-square" size={24} color="midnightblue" />
        <Icon name="twitter" size={24} color="dodgerblue" /> 
      </View>

    </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:'center'
  },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  IconText:{
    position:'absolute',
    left:50,
    top:(height/11),
    // fontWeight:1000,
    fontSize:60,
    color:'white',
   
  },
  InputBar:{
    backgroundColor:'rgba(0,0,0,0.3)',
    height:30,
    borderRadius:10,
    alignItems:'center',
    textAlign:'center',
    marginVertical:10,
    width:width/2,
    height:40
  },
  submitButton:{
    color:'midnightblue',
    borderRadius:25,
  },
  iconTray:{
    position:'absolute',
    bottom:25,
    left:45,
    right:45,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'space-between'
  },
  trayIcons:{
    padding:25
  },
  normalText:{
    position:'absolute',
    bottom:85,
    color:'white'
  }
});
