import React, { useEffect, useState } from 'react';
import {SafeAreaView, FlatList, View, Text, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native';

import SQLite from 'react-native-sqlite-storage';


SQLite.DEBUG(true);
//SQLite.enablePromise(true);
const db = SQLite.openDatabase(
      {
        name: 'solveProblem.sqlite3',
        createFromLocation:  '~www/solveProblem.sqlite3',
        location: 'Library',
      },
      (DB) => {
          console.log('success opening db');
      },
      (err)=>{
          console.log(err);
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
      init();

      console.log(2)
    },[]);

    const init = ()=>{
      db.transaction((txn)=> {
        txn.executeSql(
          'select * from tbl_reg',  //Query to execute as prepared statement
          [],  //Argument to pass for the prepared statement
          (tx, res)=> {
            //console.log(tx)
            console.log(res.rows.length)
            console.log(res.rows.item(0))
          }  //Callback function to handle the result
        );
      });
    }

    return(
        <SafeAreaView>
            <Text>{route.params.sTitle}</Text>
        </SafeAreaView>
    )
}


export default FavorList;