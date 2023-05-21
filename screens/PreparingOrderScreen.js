import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import * as Animation from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 3000);
    },[])
  return (
    <View style={styles.container} className="bg-[#00ccbb] flex-1 justify-center items-center">
          <Animation.Image source={require("../assets/orderLoading.gif")} animation="slideInDown" className="h-96 w-96" />
          <Animation.Text animation="slideInUp" iterationCount={1} className="text-lg my-10 text-white text-center font-bold">Waiting for Restaurant to accept your order!</Animation.Text>
          <Progress.Circle size={60} indeterminate={true} color="#fff" />
    </View>
  )
}

export default PreparingOrderScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,    
    }
})