import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Text, Alert} from 'react-native';
import Loding from '../../../Components/Loding';
import Api from '../../../Components/Utils/Api';
import Sql from '../../../Components/Utils/SqlQuery';

const Set = ({navigation})=>{
    const [isLoding, setIsLoding] = useState(true)

    const _getData = async()=>{
        const _sql = new Sql();
        try{
            setIsLoding(true);
            let _res = await _sql.getSelectIdxList();
            let _data = null;
            let _obj = {};
            
            if (_res.length == 0) {
                console.log(`type : 1 , ${_res.length} `)
                _obj.type = '1';
                _data = await Api.getDataAll(_obj);
                
            }else{
                console.log('?')
                await _sql.deleteAll()
            }

            if (_data.result_code == 1) {
                _res = await _sql.insertAll(_data);
                console.log(_res);
            } else {
                Alert.alert('서버와의 전송에 실패하였습니다');
            }
            
            
        }catch(e){
            console.log(e)
        }finally{
            setIsLoding(false)
        }
    }

    const _init = async()=>{
        setIsLoding(false)
    }

    useEffect(()=>{
        console.log('init')
        _init() 
    },[]);

    

    return(
        <SafeAreaView style={{flex:1,flexDirection:'column'}}>
            {isLoding == true &&  <Loding />}
            {isLoding == false &&
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>{
                            _getData();
                        }}>
                            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                                <Text>가져오기</Text>
                            </View>
                        </TouchableOpacity>    
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity>
                            <Text>2</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        <Text>3</Text>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}


export default Set;