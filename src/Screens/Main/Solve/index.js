/**
 * 오늘의 문제 풀기
 */
import React,{ useState, useEffect} from 'react';
import {FlatList, SafeAreaView, 
    TouchableOpacity, View,Text, StyleSheet, 
    Alert
    , Dimensions
    , ScrollView } from 'react-native';

import Loding from '../../../Components/Loding';
import Api from '../../../Components/Utils/Api';
import ExamTab from '../Common/ExamTab'

const Solve = ({navigation}) =>{
    const [loding, setLoding] = useState(false);
    
    const [nowPage, setNowPage] = useState(1);
    
    const [examList, setExamList] = useState([]);

    const [isFale, setIsFale] = useState(false);

    const [tabIdx, setTabIdx] = useState();

    const [isShow, setIsShow] = useState(false);
    
    
    const init = ()=>{
        setIsFale(false);
        setLoding(false);
        setNowPage(1);
        setExamList([]);
        setTabIdx(0);
        setIsShow(false);
        
        
        getData(nowPage);
    }

    const getData = async( page )=>{
        //console.log('eaxm : ' , page)
        let _objData = {};
        _objData.nowPage = page;
        let _res = null;
       
        _res = await Api.getRegList(_objData);
        
        if(_res.result_code == 1){
          
            setExamList(_res.data_list);
            setTabIdx(0);
            
            
        }else{
            setIsFale(true);
            Alert.alert('서버와의 전송에 실패하였습니다');
        }
        setLoding(true)
        
    }

    useEffect(() => {
        const initUseEffect = navigation.addListener('focus', () => {
            init();       
            
        });
    

        return initUseEffect;
    }, [navigation]);
    
    const prevView = ()=>{
      
        if(examList.length-1 == 0){

        }else{
            setIsShow(false);
            let t = tabIdx;
            t = t-1
            setTabIdx(t)
        }
    }

    const nextView = ()=>{
        //console.log(tabIdx)
                
        if(examList.length-1 == tabIdx){

        }else{
            setIsShow(false);
            let t = tabIdx;
            t = t+1
            setTabIdx(t);
        }
    }

    const showBtn = () =>{
        let s = null;
        if(isShow == false){
            s = true;
        }else{
            s = false;
        }

        setIsShow(s);
    }

    const favoBtn = ()=>{
        let p = examList[tabIdx];
        console.log(p)
    }

    if(loding==false){
        return(
            <Loding />
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            {isFale==true&&
                <View>
                    <Text>서버와의 전송에 실패하였습니다.</Text>
                </View>
            }
            {isFale == false &&

                examList.length == 0? 
                <View>
                    <Text>데이터가 없습니다.</Text>
                </View>
                :
                <ExamTab 
                    data={examList[tabIdx]}
                    prevBtn={()=>{prevView()}}
                    nextBtn={()=>{nextView()}}
                    totCnt={examList.length}
                    tabIdx={tabIdx}
                    showBtn={()=>{showBtn()}}
                    isShow={isShow}
                    favo={()=>favoBtn()}
                    type={'solve'}
                />

            }
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})

export default Solve;