/**
 * 연습 문제 풀기
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

const ExamSolve = ({navigation}) =>{
    const [loding, setLoding] = useState(false);
    
    const [nowPage, setNowPage] = useState(1);
    
    const [examList, setExamList] = useState([]);

    const [isFale, setIsFale] = useState(false);

    const [tabIdx, setTabIdx] = useState();

    const [isShow, setIsShow] = useState(false);

    const [totalPage, setTotalPage] = useState(1);
    
    
    const init = async()=>{
        setIsFale(false);
        setLoding(false);
        setNowPage(1);
        setExamList([]);
        setTabIdx(0);
        setIsShow(false);
        setTotalPage(1)

        getData(nowPage, 0);
    }

    const getData = async( page, tab )=>{
        //console.log('eaxm : ' , page)
        let _objData = {};
        _objData.nowPage = page;
        let _res = null;
       
        _res = await Api.getExamList(_objData);
        
        if(_res.result_code == 1){
            
            let l = examList;
            //console.log(_res.nowPage)
            setNowPage(_res.now_page);
            setExamList([...l, ..._res.data_list]);
            setTotalPage(_res.total_page);
            setTabIdx(tab);
            
            //console.log(nowPage)
            
        }else{
            setIsFale(true);
            Alert.alert('서버와의 전송에 실패하였습니다');
        }
        setLoding(true)
        
    }

    useEffect(() => {
       init();
    }, []);
    
    const prevView = ()=>{
      
        //console.log(tabIdx)

        if(examList.length-1 == 0){

        }else{
            setIsShow(false);
            let t = tabIdx;
            t = t-1
            setTabIdx(t);
            
        }
    }

    const nextView = ()=>{
        //console.log(tabIdx)
                
        if(examList.length-1 == tabIdx){

        }else{
            setIsShow(false);
            let t = tabIdx;
            t = t+1
            
            if(t == examList.length-3){
                
                let n = nowPage;
                
                if(nowPage == totalPage){
                        setTabIdx(t)            
                }else if(nowPage <totalPage){
                        //  화면이 랜더링 되기때문에 false를 삭제한다.
                        //setLoding(false); 
                    n = n+1;
                    getData(n,t);
                }
                    
            }else{
                setTabIdx(t)
            }
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

                <ExamTab 
                    data={examList[tabIdx]}
                    prevBtn={()=>{prevView()}}
                    nextBtn={()=>{nextView()}}
                    totCnt={examList.length}
                    tabIdx={tabIdx}
                    showBtn={()=>{showBtn()}}
                    isShow={isShow}
                    favo={()=>favoBtn()}
                    type='exam'
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

export default ExamSolve;