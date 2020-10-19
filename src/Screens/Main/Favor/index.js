import React from 'react';
import {SafeAreaView
    , FlatList, View, Text
    ,TouchableOpacity } from 'react-native';



const searchType = [
    {
        sType : 1,
        sText : '등록순'
    },
    {
        sType : 2,
        sText : '가나다순'
    }
]


const Favor = ({navigation})=>{
    const moveScreen = (arg)=>{
        //navigation.push('FavorDetailList', arg);
    }



    return(
       <SafeAreaView style={{flex:1}}>
           <View><Text>1</Text></View>
       </SafeAreaView>
    )
};

export default Favor;