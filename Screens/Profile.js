import React from 'react';
import { View,Text,Button ,FlatList, Image} from 'react-native';
import axios from 'axios'
import SplashScreen from './SplashScreen'


const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = `5f5fb88d7a86563816d9881e`;

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
          .finally(() => {this.setState({isLoading:false}),console.log(this.state.Data)}) 
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
      <View>
        <FlatList
        pagingEnabled={true}
        data={this.state.Data}
        renderItem={({item})=>{
          return(
            <View>
              <Text>{item.lastName}</Text>
              <Image source={{uri:item.picture}} style={{height:300,width:300}} />
              <Text>{item.id}</Text>
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