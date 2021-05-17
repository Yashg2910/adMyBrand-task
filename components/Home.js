import React, {useState} from 'react';
import { FlatList, View, Text, TextInput, Button, Alert } from 'react-native';
import filter from 'lodash.filter';
import {randomWords} from 'random-words';
import { Icon } from 'react-native-elements';


export default function Home(){
  
  const url = "https://random-words-api.vercel.app/word";

  const [data, setData] = useState([
    { id: '1', text: 'Hi' },
    { id: '2', text: 'This' },
    { id: '3', text: 'React native' }
  ]);

  const [fullData, setFullData] = useState([
    { id: '1', text: 'Hi' },
    { id: '2', text: 'This' },
    { id: '3', text: 'React native' }
  ]);
  
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    )
  }

  const handleSearch = text => {

    const formattedQuery = text.toLowerCase();
    // const new_data = filter(fullData, item=>{ return } )
    
    const new_data = fullData.filter(function(item){
      return item.text.toLowerCase().includes(formattedQuery);
    });
    
    setData(new_data);
  }

  

  const addWordToList = () => {
    
    let new_obj = {}

    fetch(url).then(res => res.json()).then(res=> {
      
      new_obj = {
        id: (fullData.length+1).toString(),
        text: res[0].word
      }
      let new_array = [...fullData];

      new_array.push(new_obj);
      
      setFullData(new_array);
      setData(new_array);

      console.log(data);  
    });
  }
  
  return(
    <View>
      <Text>{}</Text>
      <View
        style={{
          display:'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 10,
        }}>
        <TextInput
          key="textinput"
          onChangeText={handleSearch}
          placeholder='Search'
          style={{
            flex: 1,
            borderRadius: 25,
            borderColor: '#333',
            backgroundColor: '#fff',
            padding: 5,
            paddingHorizontal: 10,
            borderWidth:2

          }}
          textStyle={{ color: '#000' }}
        />
        <Icon
        name='add-circle'
        color='#00aced'
        onPress={addWordToList}
        style={{
          paddingHorizontal:5,
        }}
         />
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, width: '100%' }}>
          <Text style={{ fontSize: 22 }}>
            {item.id}.  {item.text}
          </Text>
          </View>
        )}
        ItemSeparatorComponent = {renderSeparator}
      />

    </View>
  );
}