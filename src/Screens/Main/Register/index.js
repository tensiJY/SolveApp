/**
 * 문제등록 
 */
import React,{useEffect, useState} from 'react';
import {
        ScrollView
        , TextInput
        , View
        , StyleSheet
        , SafeAreaView
        , Text
        , TouchableOpacity
        , Button,
        Alert} from 'react-native';

import Loding from '../../../Components/Loding';

const Register = ({navigation})=>{

    const [isLoding, setIsLoding] = useState(false);

    //  문제 질문
    const [title, setTitle] = useState();
    //  보기 1~5
    const [detailCnt, setDetailCnt] = useState(3);   
    //  보기 내용
    const [detail, setDetail] = useState([null,null,null]);
    //  정답 번호
    const [answer, setAnswer] = useState();

    //  질문 
    const addTitle = (arg)=>{
        let t = arg;
        setTitle(t)
    }
    
    //  보기 추가      //   최대 5개까지
    const addDetailCnt = ()=>{
        //console.log('addDetailCnt : ', detailCnt);
        if(detailCnt==5){
            return Alert.alert('보기는 최대 5개까지만 \n 작성 할 수 있습니다.');
        }
        let cnt = detailCnt + 1;
        setDetailCnt(cnt);
        setDetail([...detail,null]);
    }

    //  보기 삭제   //  
    const delDetailCnt = ()=>{
        if(detailCnt == 3){
            return Alert.alert('보기는 최소 3개입니다.');
        }
        let a = detail;
        a.splice(detail.length-1, 1);
        setDetailCnt(detailCnt-1);
        setDetail(a);
    }

    //  보기1-5
    const addDetail = (text, idx)=>{
        let v = detail;
        v[idx] = text;

        setDetail(v);
        //console.log(v)
    }

    //  정답
    const addAnswer = (text) =>{
        setAnswer(text);
        //console.log(answer)
    }

    //console.log('answer : ', answer)

    const confirm = ()=>{
        //  질문 체크, 보기 체크, 정답 체크
        if(title==null || title.trim()==""){
            return Alert.alert('');
        }

        Alert.alert( 
            "문제를 등록 하시겠습니까?", 
            "",
            [
              {
                text: "cancel",
                //onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {saveRegister()} }
            ],
            { cancelable: false }
          );
    }

    //  저장
    const saveRegister = () =>{
        setIsLoding(false);
        console.log(1)

        setTimeout(()=>{
            setIsLoding(true)
        }, 5000)
    }

    //  초기화 함수
    useEffect(()=>{
        console.log('useEffect')
        setIsLoding(true);
    },[])

    //  로딩!
    if(isLoding==false){
        return(
            <Loding />
        )
    }
    
    return(
                
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.regTopView}>
                    <View style={{padding : 10}}>
                        <Text style={{fontSize:18}}>질문 작성</Text>
                    </View>
                    <View style={{paddingTop:5, paddingLeft:10, paddingBottom:10, paddingRight:10}}>
                        <TextInput 
                            placeholder='질문은?' 
                            multiline
                            numberOfLines={3}
                            onChangeText={ (a)=>addTitle(a) }
                            style={{ paddingLeft:10, borderWidth : 1, borderRadius : 10, borderColor : 'skyblue'}}
                        />
                    </View>
                </View>

                <View style={styles.regMidView}>    
                    <View style={{padding:10, flexDirection:'row'}}>
                        <View stlye={{flex:1}}>
                            <Text style={{fontSize:18}}>보기 작성</Text>
                        </View>
                        
                        <View style={{flex:1,alignItems:"flex-end"}}>
                            <SafeAreaView style={{flex:1,flexDirection:'row'}}>
                                <TouchableOpacity style={{paddingRight:10}} onPress={()=>{addDetailCnt()}}>
                                    <Text>add</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>{delDetailCnt()}}>
                                    <Text>del</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </View>
                    </View>

                    <View style={{paddingTop:5, paddingLeft:10, paddingBottom:10, paddingRight:10}}>
                        {
                            detailCnt>=1?   
                            <View style={{paddingBottom:5}}>
                                <TextInput 
                                placeholder='1 ...' 
                                onChangeText={ (text, idx)=>addDetail(text, 0) }
                                style={{ paddingLeft:10,  borderWidth : 1, borderRadius : 10, borderColor : 'skyblue'}}
                                />
                            </View>
                                :
                                undefined
                        }
                        
                        {
                            detailCnt>=2?
                            <View style={{paddingBottom:5}}>
                                <TextInput 
                                    placeholder='2 ...' 
                                    onChangeText={ (text, idx)=>addDetail(text, 1) }
                                    style={{ paddingLeft:10, borderWidth : 1, borderRadius : 10, borderColor : 'skyblue'}}
                                />
                            </View>
                            :
                            undefined
                        }

                        {
                            detailCnt>=3?
                            <View style={{paddingBottom:5}}>
                                <TextInput 
                                    placeholder='3 ...' 
                                    onChangeText={ (text, idx)=>addDetail(text, 2) }
                                    style={{ paddingLeft:10, borderWidth : 1, borderRadius : 10, borderColor : 'skyblue'}}
                                />
                            </View>
                            :
                            undefined
                        }
                    
                        {
                            detailCnt>=4?
                            <View style={{paddingBottom:5}}>
                                <TextInput 
                                    placeholder='4 ...' 
                                    onChangeText={ (text, idx)=>addDetail(text, 3) }
                                    style={{ paddingLeft:10, borderWidth : 1, borderRadius : 10, borderColor : 'skyblue'}}
                                />
                            </View>
                            :
                            undefined
                        }

                        {
                            detailCnt>=5?
                            <View style={{paddingBottom:5}}>
                                <TextInput 
                                    placeholder='5 ...' 
                                    onChangeText={ (text, idx)=>addDetail(text, 4) }
                                    style={{ paddingLeft:10, borderWidth : 1, borderRadius : 10, borderColor : 'skyblue'}}
                                />
                            </View>
                            :
                            undefined
                        }
                    </View>
                    
                </View>

                <View style={styles.regBotView}>
                    <View style={{paddingLeft: 10, paddingBottom:10}}>
                       <View style={{flex:1, paddingBottom:5}}> 
                            <Text style={{fontSize:18}}>정답 등록</Text>
                        </View>
                        <View style={{paddingBottom : 5, paddingRight:10, flex:1}}> 
                            <TextInput 
                                maxLength={1}
                                placeholder='1'
                                keyboardType='number-pad'
                                onChangeText={(text)=>{addAnswer(text)}}
                                style={{ paddingLeft:10,  borderWidth : 1, borderRadius : 10, borderColor : 'skyblue'}}
                            />
                        </View>
                        <View style={{paddingTop : 20, flex:1, alignItems:'center'}}> 
                            <TouchableOpacity onPress={()=>confirm()}>
                                <Text style={{padding:8,textAlign:'center' ,borderWidth:1, width:100, fontSize:18, borderColor:'pink', borderRadius:10, backgroundColor:'skyblue', color:'white'}}>
                                    문제 등록
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>    
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    regTopView : {
        flex : 1,
        justifyContent : 'center'
    },
    regMidView : {
        flex : 2
    },
    regBotView : {
        flex : 1,
        paddingBottom : 10
    },
   
});

export default Register;