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
        , Button} from 'react-native';


const Input = ()=>{
    return(
        <TextInput />
    )
}

const Register = ({navigation})=>{
    
    const [title, setTitle] = useState();

    const [detailCnt, setDetailCnt] = useState(1);
    
    //  질문 
    const addTitle = (arg)=>{
        let t = arg;
        setTitle(t)
    }
    
    //  보기 추가      //   최대 5개까지
    const addDetailCnt = ()=>{
        let cnt = detailCnt + 1;
        setDetailCnt(cnt);
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

                                <TouchableOpacity>
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
                                //onChangeText={ (a)=>addTitle(a) }
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
                                    //onChangeText={ (a)=>addTitle(a) }
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
                                    //onChangeText={ (a)=>addTitle(a) }
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
                                    //onChangeText={ (a)=>addTitle(a) }
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
                                    //onChangeText={ (a)=>addTitle(a) }
                                    style={{ paddingLeft:10, borderWidth : 1, borderRadius : 10, borderColor : 'skyblue'}}
                                />
                            </View>
                            :
                            undefined
                        }
                    </View>
                    
                
                </View>

                <View style={styles.regBotView}>
                    <View>
                        <View> 
                            <Text>정답 등록</Text>
                        </View>
                        <View> 
                            <TextInput />
                        </View>
                        <View> 
                            <TouchableOpacity>
                               <Button title='등록'/>
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