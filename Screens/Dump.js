import React,{Component} from 'react';
import {View,Text,FlatList,Image,Dimensions,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const windowHeight=Dimensions.get('window').height;
const windowWidth=Dimensions.get('window').width;


const ImageData=[{key:'1',imageURI:{uri:'https://images.unsplash.com/photo-1597871761588-97ebfda1eb5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},userName:'HealthFreak11'},
  {key:'2',imageURI:{uri:'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},userName:'LovelyLeslie'},
  {key:'3',imageURI:{uri:'https://images.unsplash.com/photo-1521805492803-3b9c3792c278?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},userName:'GymLover36'}
];

const AvatarData={
  HealthFreak11:'https://images.unsplash.com/photo-1583951290243-970177c6277d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  LovelyLeslie:'https://images.unsplash.com/photo-1593440497401-b87d3bb3fb8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  GymLover36:'https://images.unsplash.com/photo-1597750955232-b6040c843cf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
};

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      heartColor:'rgba(0,0,0,0.2)',
      poopColor:'rgba(0,0,0,0.2)'
    }
  }
  
  render(){
    return(
      <View>
      <FlatList
        data={ImageData}
        renderItem={({item}) =>{
          return(
          <View style={styles.homeScreen}>
            <View style={styles.postHeader}>
              {/* <Avatar user={item.userName} /> */}
              <Image style={styles.avatar} source={{uri:AvatarData[item.userName]}} />
              <Text style={styles.usernameText}>{item.userName}</Text>
              <Icon name='dots-vertical' style={styles.postHeaderIcon} color='white' size={35} onPress={()=>alert(`${item.userName} posted this shit`)} />
            </View>

            <Image style={styles.postImage} source={item.imageURI} />

            <View style={styles.postFooter}>
              <View style={styles.postFooterIconTray}>
                <Icon name='heart' size={35} onPress={()=>this.setState({heartColor:'red'})} color={this.state.heartColor} style={styles.postFooterIcon} />
                <Icon name='emoticon-poop' size={35} onPress={()=>this.setState({poopColor:'#a52a2a'})} color={this.state.poopColor} style={styles.postFooterIcon}  />
              </View>
              <View style={styles.footerContent}>
                <Text style={styles.footerCaption}>{`${item.userName}`}</Text>
                <Text numberOfLines={5}  style={styles.postFooterComment}>Getting Buff at the Gym,I remember the first time I set foot in here anf felt like home.Thanks to this Journey It's been so inspiring</Text>
              </View>
            </View>
          </View>
          )
        }
      }
      />
      </View>
    );
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
    borderTopColor:'grey',
    borderTopWidth:2,
    borderBottomColor:'grey',
    borderBottomWidth:2
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
    flexDirection:'row'
  },

  postFooterIcon:{
    paddingHorizontal:5,
    paddingVertical:10
  },

  footerContent:{
    flexDirection:'row'
  },

  footerCaption:{
    fontWeight:'bold',
    paddingHorizontal:10,
    paddingVertical:5,
    fontSize:15
  },
  postFooterComment:{
    fontSize:12,
    paddingVertical:10
  }
})