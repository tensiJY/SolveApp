import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

const Loding = ()=>{
    return(
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
});

export default Loding;
