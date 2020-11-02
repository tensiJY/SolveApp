import React, { useEffect, useState } from 'react';
import {SafeAreaView, FlatList, View, Text, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);

//var db = SQLite.openDatabase({name : "players.db", createFromLocation : "~players.db", location: 'Library'});
const db = SQLite.openDatabase(
    {
      name: 'solveProblem.db',
      createFromLocation:  '~ www / solveProblem.db',
      location: 'Library',
    }
  );


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
        console.log(db)
        db.transaction((txn)=> {
            txn.executeSql(
              'select * from tbl_reg',  //Query to execute as prepared statement
              [],  //Argument to pass for the prepared statement
              (tx, res)=> {
                  console.log(tx)
                  console.log(res.rows.length)
              }  //Callback function to handle the result
            );
          });
        //console.log(route.params);
    },[]);

    return(
        <SafeAreaView>
            <Text>{route.params.sTitle}</Text>
        </SafeAreaView>
    )
}


export default FavorList;