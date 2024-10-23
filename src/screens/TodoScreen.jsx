import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Alert, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { AddCircle, CloseCircle, Edit2, TickCircle, Trash } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';




const TodoScreen = () => {

  const navigation = useNavigation();
  // Inputun içerisindeki değer
  const [todo, setTodo] = useState('');
  // eklenilen todolar
  const [todos, setTodos] = useState([]);
 
  const saveTodos = async saveTodo => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async id => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const completeTodo = async (id) => {
    const updatedTodos = todos.map(item => 
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);

  };

  const updateTodos = id => {
    const exitingTodo = todos?.find(item => item.id === id);
    if (!exitingTodo) return;

    Alert.prompt(
      'Edit Todo',
      'Update',
      newUpdateText => {
        if (newUpdateText) {
          const updateTodos = todos.map(item =>
            item?.id === id ? { ...item, text: newUpdateText } : item
          );
          setTodos(updateTodos);
          saveTodos(updateTodos);
        }
      },
      'plain-text',
      exitingTodo.text
    );
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = () => {
    if (!todo.trim()) {
      alert('Lütfen bir todo girin!');
      return;
    }

    const updatedTodos = [...todos, { id: uuid.v4(), text: todo,completed: false }];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setTodo('');

  };

  return (
    <LinearGradient colors={[ '#fef3c7', '#a78bfa']} style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
        <Text style={styles.headerText}>TO-DO LIST</Text>
        <Button
        title="Back"
        type="button"
        onPress={() => navigation.navigate('Home')}
      />
      </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => setTodo(text)}
            value={todo} 
            placeholder="Type a Todo" 
            style={styles.input}
          />
          <TouchableOpacity 
          onPress={addTodo} 
          style={[styles.button, styles.addButton]}>
          <AddCircle size="32" color="#f47373" variant='Broken'/>
          </TouchableOpacity>
        </View>
 
        <FlatList
          data={todos}
          keyExtractor={item => item?.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={[ styles.todoText, item.completed && styles.completedText ]}>{item?.text}</Text>

              <View style={{ flexDirection: 'row' }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                    onPress={() => completeTodo(item?.id)} 
                    style={[styles.button, styles.completeButton]}>
                      <Text style={styles.buttonText}>
                        {item.completed ? (
                            <CloseCircle size="24" color="#000" variant='Broken'/>
                          ) : (
                            <TickCircle size="27" color="#ff8a65" variant='Broken'/>
                          )
                        }
                      </Text>
                    </TouchableOpacity>
                  </View>
              
             
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => deleteTodo(item?.id)} 
                  style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>
                      <Trash size="32" color="#f47373" variant="Broken"/>
                    </Text>
                  </TouchableOpacity>
                </View>
              
             
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                  onPress={() => updateTodos(item?.id)} 
                  style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>
                    <Edit2 size="32" color="#f47373" variant="Broken"/>
                  </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
  button: {
    marginLeft: 10,
    borderRadius: 5,
    padding: 8,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  buttonText: {
    color: 'gray',
    fontWeight: "500",
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,

  },
  todoText: {
    color: "#000",
    textDecorationLine: "none",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  deleteButton: {
    padding: 10,
    justifyContent: 'space-around',
  },
  updateButton: {
    padding: 10,
  },
  completeButton: {
    padding: 10,

    
  },
  header: {
    flexDirection: "row",
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',

  },

  
});
