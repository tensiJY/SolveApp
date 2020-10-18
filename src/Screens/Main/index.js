import React from 'react';
import {Button, View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

//#f7a7bb;
const Main = ({navigation}) =>{
  return(
    <SafeAreaView style={styles.safeAreaViewcontainer}>
      
      <View style={styles.outerViewContainer}>
        <TouchableOpacity style={styles.innerViewContainer} onPress={()=>{navigation.navigate("Solve")}}>
          <Text>오늘의 문제</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.innerViewContainer}>
          <Text>즐겨찾기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.outerViewContainer}>
        <TouchableOpacity style={styles.innerViewContainer} onPress={()=>{navigation.navigate("ExamSolve")}}>
          <Text>연습문제</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.innerViewContainer} onPress={()=>{navigation.navigate('Register')}}>
          <Text>문제등록</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.outerViewContainer}>
        <TouchableOpacity style={styles.innerViewContainer}>

          <Text>내정보</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.innerViewContainer}>
          <Text>설정</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaViewcontainer: {
    flex : 1,
  },
  outerViewContainer : {
    flex : 1,
    flexDirection : 'row',
    
  },
  innerViewContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 1
  }
});

export default Main;

const FirstPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            This is the First Page under First Page Option
          </Text>
          <Button
            onPress={() => navigation.navigate('SecondPage')}
            title="Go to Second Page"
          />
          <Button
            onPress={() => navigation.navigate('ThirdPage')}
            title="Go to Third Page"
          />
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          React Navigate Drawer
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

//export default FirstPage;
