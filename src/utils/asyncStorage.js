import { AsyncStorage } from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key,value)
  } catch (error) {
    console.log("SETITEM: " , error);
  }
};


export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("GETITEM: " , error);
  }
};

export const remoweItem = async (key) => {
  try {
    await AsyncStorage.remoweItem(key)
  } catch (error) {
    console.log("REMOWEITEM: " , error);
  }
};



