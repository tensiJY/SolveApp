import React, { useEffect } from 'react';
import {SafeAreaView, FlatList, View, Text, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native';

//  route.params
const FavorList = ({navigation, route}) =>{
    const [favorList, setFavorList] = useEffect([]);

    
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
        console.log(route.params)
    },[]);

    return(
        <SafeAreaView>
            <Text>{route.params}</Text>
        </SafeAreaView>
    )
}


export default FavorList;