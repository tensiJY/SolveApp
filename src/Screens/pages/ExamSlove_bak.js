import React,{ useState, useEffect} from 'react';
import {FlatList, SafeAreaView, 
    TouchableOpacity, View,Text, StyleSheet, 
    Alert,Dimensions } from 'react-native';

import Loding from '../../../Components/Loding';
import Api from '../../../Components/Utils/Api';

const ExamItem = ({data})=>{
    const row_idx       = data.row_idx;
    const sol_idx       = data.sol_idx   ;      
    const sol_title     = data.sol_title ;   
    const sol_answer    = data.sol_answer;   
    const sol_dtl1      = data.sol_dtl1  ;    
    const sol_dtl2      = data.sol_dtl2 ;
    const sol_dtl3      = data.sol_dtl3 ;
    const sol_dtl4      = data.sol_dtl4 ;
    const sol_dtl5      = data.sol_dtl5 ;
    const sol_cnt       = data.sol_cnt ;

    const containerWidth = Dimensions.get('screen').width;
    
    return(
       <View style={{flex:1, width:containerWidth}}>
            <View>
                <Text>{sol_title}</Text>
            </View>
            <View>
                <View>
                    <Text>{sol_dtl1}</Text>
                </View>
                <View>
                    <Text>{sol_dtl2}</Text>
                </View>
                <View>
                    <Text>{sol_dtl3}</Text>
                </View>
                <View>
                    <Text>{sol_dtl4}</Text>
                </View>
                {sol_cnt==5?
                    <View>
                        <Text>{sol_dtl5}</Text>
                    </View>
                    :
                    undefined
                }
            </View>
        </View>
    )
}

const ExamSolve = ({navigation}) =>{
    const [loding, setLoding] = useState(false);
    
    const [nowPage, setNowPage] = useState(1);
    
    const [totalPage, setTotalPage] = useState(1);

    const [examList, setExamList] = useState([]);

    const [isFale, setIsFale] = useState(false);

        
    // useEffect(() => {
    //     const initUseEffect = navigation.addListener('focus', () => {
    //         init();       
    //         getData(nowPage);    
    //         setLoding(true);
    //     });
    

    //     return initUseEffect;
    //   }, [navigation]);
    

    const init = ()=>{
        setLoding(false);
        setNowPage(1);
        setTotalPage(1);
        setExamList([]);
        
        getData(nowPage);
    }

    const getData = async( page )=>{
        //console.log('eaxm : ' , page)
        let _objData = {};
        _objData.nowPage = page;
        let _res = null;
       
        _res = await Api.getExamList(_objData);
            if(_res.result_code == 1){
            //console.log(_res)
            let l = examList;
            setExamList([...l, ..._res.data_list])
            setTotalPage(_res.total_page);
            setNowPage(_res.now_page);
                        
        }else{
            //isFale(true);
            Alert.alert('서버와의 전송에 실패하였습니다');
        }
        setLoding(true)
        
    }

    
    useEffect(()=>{
        init();
    },[])
    
    
    // useEffect(() => {
    //     const initUseEffect = navigation.addListener('focus', () => {
    //         init();       
    //     });
    //     return initUseEffect;
    //   }, [navigation]);
    
    

    if(loding==false){
        return(
            <Loding />
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={examList}
                keyExtractor={(item, index)=>{
                    //console.log(item, index)
                    return `exam-${index}`;
                }}
                renderItem={ ({item,index})=>(
                        <ExamItem 
                            data={item}
                        />
                    )
                }
                horizontal={true}
                onEndReached={ ()=>{
                    let n = nowPage;
                    let t = totalPage;

                    console.log(n , t);

                    if(nowPage == totalPage){

                    }else if(nowPage <totalPage){
                        //  화면이 랜더링 되기때문에 false를 삭제한다.
                        //setLoding(false); 
                        n = n+1;
                        getData(n);
                    }
                    
                }}
                
            />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})

export default ExamSolve;