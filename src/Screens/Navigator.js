import 'react-native-gesture-handler';

import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';

import {NavigationContainer, CommonActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';


//  메인
import Main from './Main';

//  오늘의 문제
import Solve from './Main/Solve'

//  문제등록
import Registger from './Main/Register';

//  연습문제
import ExamSolve from './Main/ExamSolve';

//  즐겨찾기
import Favor from './Main/Favor';


import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          // source={{
          //   uri:
          //     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          // }}
          source={require('../Assets/images/drawerWhite.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

const MainScreenStack=({navigation})=>{
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: 'Main', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

const SolveScreenStack=({navigation})=>{
  return (
    <Stack.Navigator initialRouteName="Solve">
      <Stack.Screen
        name="Solve"
        component={Solve}
        options={{
          title: '오늘의 문제', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

const ExamSolveScreenStack=({navigation})=>{
  return (
    <Stack.Navigator initialRouteName="ExamSolve">
      <Stack.Screen
        name="ExamSolve"
        component={ExamSolve}
        options={{
          title: '연습문제', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}


const RegisterScreenStack=({navigation})=>{
  return(
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen
        name="Register"
        component={Registger}
        options={{
          title: '문제등록', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  )
}

const FavorScreenStack=({navigation})=>{
  return(
    <Stack.Navigator initialRouteName="Favor">
      <Stack.Screen
        name="Favor"
        component={Favor}
        options={{
          title: '즐겨찾기', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

    </Stack.Navigator>
  )
}


const secondScreenStack=({navigation})=> {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          title: 'Second Page', //Set Header Title
        }}
      />
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage}
        options={{
          title: 'Third Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

const MainNavigator =()=>{
  return (
   
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}>
        <Drawer.Screen
          name="Main"
          options={{drawerLabel: 'Main'}}
          component={MainScreenStack}
        />

        <Drawer.Screen
          name="Solve"
          options={{drawerLabel: '오늘의문제'}}
          component={SolveScreenStack}
        />

        <Drawer.Screen
          name="Favor"
          options={{drawerLabel: '즐겨찾기'}}
          component={FavorScreenStack}
        />

        <Drawer.Screen
          name="ExamSolve"
          options={{drawerLabel: '연습문제'}}
          component={ExamSolveScreenStack}
        />

        <Drawer.Screen
          name="Register"
          options={{drawerLabel: '문제등록'}}
          component={RegisterScreenStack}
        />

        <Drawer.Screen
          name="SecondPage"
          options={{drawerLabel: 'Second page Option'}}
          component={secondScreenStack}
        />
      </Drawer.Navigator>
    
  );
}

const LoginNavigator = ()=>{
  return(
    <View>
      <Text>1</Text>
    </View>
  )
}

const Navigator = ()=>{
  const isUserInfo = true;

  return(
    <NavigationContainer>
      {isUserInfo===true? <MainNavigator/> : <LoginNavigator />}
    </NavigationContainer>
  )

}

export default Navigator;
