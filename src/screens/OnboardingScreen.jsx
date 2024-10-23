import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import  Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';


const {width, height} = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    console.log('Done button pressed');
    navigation.navigate('Home');
    setItem('onboarded', '1');
  };



  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{color: 'black'}}>Done</Text>
      </TouchableOpacity>
    );
}

 
  return (
    <View style={styles.container}>
      <Onboarding 
      onDone={handleDone}
      onSkip={handleDone}
      DoneButtonComponent={doneButton}
      containerStyles = {{paddingVertical: 95}}
      pages={[
        {
      backgroundColor: '#fef3ce',
      image: (
      <View 
      style={styles.lottie}>
        <Lottie 
        style={{flex:1}}
        source={require('../assets/todo.json')}
         autoPlay
          loop
        />
      </View>
      ),
      title: 'Boost Your Productivity',
      subtitle: 'Join our Udemig courses to enhance your skills!',
    }, 
    {
      backgroundColor: '#a78bfa',
      image: (
      <View style={styles.lottie} >
        <Lottie 
        style={{flex: 1}}
        source={require('../assets/working.json')}
         autoPlay
          loop
        />
      </View>
      ),
      title: 'Work Without Interruptions',
      subtitle: 'Complete your tasks smoothly with our productivity tips.',
    }, 
    {
      backgroundColor: '#e8b4e0',
      image: (
      <View style={styles.lottie}>  
        <Lottie 
        style={{flex:1}}
        source={require('../assets/takvim.json')}
         autoPlay
          loop
        />
      </View>
      ),
      title: 'Reach Higher Goals',
      subtitle: 'Utilize our platform to achieve your proffessional aspirations.',
    }, 
    {
      backgroundColor: '#a3e3ec',
      image: (
      <View style={styles.lottie}>
        <Lottie 
        style={{flex:1}}
        source={require('../assets/success.json')}
         autoPlay
          loop
        />
      </View>
      ),
      title: 'Success is a journey,',
      subtitle: ' not a destination.',
    }, 

    

  ]}
/>
    </View>
  )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width*0.99,
    height: width,
  },
  doneButton:{
    padding: 20,
  } 
});