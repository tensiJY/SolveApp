import React, { useEffect, useState } from 'react';
import {SafeAreaView, FlatList, View, Text, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native';

import Sql from '../../../../Components/Utils/SqlQuery'

//  route.params
const FavorList = ({navigation, route}) =>{
   
    //const [params]
    const [favorList, setFavorList] = useState([]);

       
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => {
            return(
                <SafeAreaView>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Text>뒤로가기</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )
          },
        });
      }, [navigation]);

    useEffect(()=>{
      init();

      
    },[]);

    const init =  async ()=>{
      
      var _d =  await new Sql().selectQuery();
      
      console.log('init')
      console.log(_d)
      
    }

    return(
        <SafeAreaView>
            <Text>{route.params.sTitle}</Text>
        </SafeAreaView>
    )
}


export default FavorList;