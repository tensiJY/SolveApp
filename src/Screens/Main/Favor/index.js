import React from 'react';
import {SafeAreaView
    , FlatList, View, Text
    ,TouchableOpacity } from 'react-native';



const searchType = [
    {
        sType : '1',
        sTitle : '오늘의 문제',
        sText : '날짜순'
    },
    {
        sType : '2',
        sTitle : '오늘의 문제',
        sText : '제목순'
    },
    {
        sType : '3',
        sTitle : '즐겨 찾기',
        sText : '등록 순'
    },
    {
        sType : '4',
        sTitle : '즐겨 찾기',
        sText : '제목 순'
    }
   
]

const FavorItem = ({sType, sText,sTitle, onPress})=>{

    return(
        <View style={{flex:1}}>
            <TouchableOpacity onPress={onPress}>
                <View style={{flex:1, height:150, borderWidth:1,borderColor:'pink'}}>
                    <View style={{flex:1,flexDirection:'row' }}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text>이미지</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:18}}>{sTitle}</Text>
                            <Text style={{fontSize:15}}>{sText}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const Favor = ({navigation})=>{
    const moveScreen = (obj)=>{
        
        navigation.navigate('FavorList', obj);
    }



    return(
       <SafeAreaView style={{flex:1}}>
           <FlatList 
                data={searchType}
                renderItem={({item, index})=>{
                    return(
                        <FavorItem
                            sType={item.sType}
                            sText={item.sText}
                            sTitle={item.sTitle}
                            onPress={()=>{moveScreen(item) }}
                        />
                    )    
                }}
                keyExtractor={(item, index)=>{
                    return `key-${index}`;
                }}
                
           />
       </SafeAreaView>
    )
};

export default Favor;