import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { remoweItem } from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {

  const navigation = useNavigation();

  const handleReset = async () => {
    await remoweItem('onboarded');
    navigation.push('Onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
     <View 
      style={styles.lottie}>
        <Lottie
        style={{flex:1}}
        source={require('../assets/Animation.json')}
         autoPlay
          loop 
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Todo')} style={styles.addTaskButton}>
        <LinearGradient style={styles.addTaskButton} colors={["#a78bfa", "#fef3c7"]}>
          <Text style={styles.addTaskText}> New Task, Who's In?</Text>
        </LinearGradient>
      
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <LinearGradient style={styles.resetButton} colors={["#a7f3d0", "#ff6347"]}>
          <Text style={styles.addTaskText}> Reset</Text>
        </LinearGradient>
      
      </TouchableOpacity>
    </SafeAreaView> 
  )
}
export default HomeScreen;

const styles = StyleSheet.create ({
  lottie: {
    width: width * 0.9,
    height: width,
  },
  container:{
    flex:1,
    alignItems: "center",
    backgroundColor: "#fef3c7"

  },
  addTaskButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addTaskText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  resetButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.3, 
    shadowRadius:3.84,
    elevation: 5, 
    marginTop: 20,

  },
  resetText : {
    color:'#fff',
    fontSize:18,
    fontWeight: 'bold',
    textAlign :'center',
  }
})
