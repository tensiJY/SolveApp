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

import Api from '../../../Components/Utils/Api';

const Register = ({navigation})=>{

    const [loding, setLoding] = useState(false);

    //  문제 질문
    const [title, setTitle] = useState();
    //  보기 1~5
    const [detailCnt, setDetailCnt] = useState();   
    //  보기 내용
    const [detail, setDetail] = useState();
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
        if(detailCnt == 4){
            return Alert.alert('보기는 최소 4개입니다.');
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
            return Alert.alert('질문을 작성해주시기 바랍니다.');
        }
        
        for(let i=0; i<detailCnt; i++){
            let d = detail[i];
            if(d == null || d.trim()==""){
                return Alert.alert(`${i+1}번 보기를 작성해주시기 바랍니다`);
            }
        }

        //console.log(typeof answer)
        
        if(answer>detailCnt || answer == null || answer==0 || answer.trim()==''){
            return Alert.alert('정답을 제대로 입력해주시기 바랍니다.');
        }

        
        if(isNaN(answer)){
            return Alert.alert('정답을 제대로 입력해주시기 바랍니다.');
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
    const saveRegister = async () =>{
       

        setLoding(false);
        let dataObj = {};
        dataObj.reg_title = title;      //  제목
        dataObj.reg_cnt = detailCnt;    //  총 몇 문항인지..
        dataObj.reg_answer = answer;    //  정답 문항
        dataObj.reg_dtl1 = detail[0];
        dataObj.reg_dtl2 = detail[1];
        dataObj.reg_dtl3 = detail[2];
        dataObj.reg_dtl4 = detail[3];
        dataObj.reg_dtl5 = detailCnt ==5 ?  detail[4] : null;

        const res = await Api.regInsert(dataObj);

        if(res.result_code == 1){
            Alert.alert('저장에 성공하였습니다');
        }else{
            if(res.error_msg != null){
                Alert.alert(res.error_msg);
            }
        }

        init();
        
        setLoding(true);
    }

    const init = () => {
        //  문제 질문
        setTitle(null);
        setDetailCnt(4);
        setDetail([null,null,null,null]);
        setAnswer(null);
    
    }

    //  초기화 함수
    useEffect(  ()=>{
        init();
        setLoding(true);
        
    },[])

    //  로딩!
    if(loding==false){
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