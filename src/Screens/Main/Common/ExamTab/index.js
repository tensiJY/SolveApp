import React from 'react';
import {
    SafeAreaView
    , StyleSheet
    , View
    , Text
    , TouchableOpacity
    , ScrollView
    , Alert
} from 'react-native';

const ExamTab = ({data, prevBtn, nextBtn,totCnt,tabIdx, showBtn, isShow, favo, type})=>{
    //console.log(type)    
    const selectBtn = (number) => {
        if(number == data.sol_answer){
            Alert.alert('정답입니다.');

        }else{
            
            Alert.alert('틀렸습니다.');
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                <View style={{flex:1, flexDirection:'column', padding:25,}}>
                    <View> 
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            
                            <View>
                                {type=='solve'&&<Text>({tabIdx+1} / {totCnt})</Text>}
                            </View>

                            <View>
                                <TouchableOpacity onPress={favo}>
                                    <Text> 즐겨찾기 </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{paddingTop:10}}> 
                        <View>
                            <Text style={{fontSize:20}}>
                                {tabIdx+1 +'. '} {data.sol_title}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <View style={{paddingTop:10, paddingBottom:10}}>
                            <TouchableOpacity onPress={()=>{selectBtn(1)}}>
                                <View style={{backgroundColor:'#e6e6e6',padding:15}}>
                                    <Text style={{fontSize:18}}>{data.sol_dtl1}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingTop:10, paddingBottom:10}}>
                            <TouchableOpacity onPress={()=>{selectBtn(2)}}>
                                <View style={{backgroundColor:'#e6e6e6',padding:15}}>
                                    <Text style={{fontSize:18}}>{data.sol_dtl2}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingTop:10, paddingBottom:10}}>
                            <TouchableOpacity onPress={()=>{selectBtn(3)}}>
                                <View style={{backgroundColor:'#e6e6e6',padding:15}}>
                                    <Text style={{fontSize:18}}>{data.sol_dtl3}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingTop:10, paddingBottom:10}}>
                            <TouchableOpacity onPress={()=>{selectBtn(4)}}>
                                <View style={{backgroundColor:'#e6e6e6',padding:15}}>
                                    <Text style={{fontSize:18}}>{data.sol_dtl4}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {data.sol_cnt ==5&&
                        <View style={{paddingTop:10, paddingBottom:10}}>
                            <TouchableOpacity onPress={()=>{selectBtn(5)}}>
                                <View style={{backgroundColor:'#e6e6e6',padding:15}}>
                                    <Text style={{fontSize:18}}>{data.sol_dtl5}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        }
                    </View>

                    <View style={{flex:1,paddingTop:10,paddingBottom:10}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>showBtn()}>
                                <View style={{backgroundColor:'skyblue', width:200, justifyContent:'center', alignItems:'center', height:40}}>
                                    {isShow == false &&
                                        <Text>정답보기</Text>
                                    }
                                    {isShow == true &&
                                        <Text>{data['sol_dtl'+data.sol_answer]}</Text>
                                    }
                                    
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flex:1, paddingTop:10}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                            <View>
                            { tabIdx !=0 &&
                                <TouchableOpacity  onPress={()=>{prevBtn()}}>
                                    <Text>prev</Text>
                                </TouchableOpacity>        
                            }
                            </View>
                            <View>
                            {
                            tabIdx != (totCnt-1) &&
                                <TouchableOpacity onPress={nextBtn}>
                                    <Text>next</Text>
                                </TouchableOpacity>        
                            }
                            </View>
                        </View>
                    </View>
                    
                </View>

            </ScrollView>
        </SafeAreaView>
        
    )
}

export default ExamTab;