import Constants from 'expo-constants';
import { StyleSheet, TextInput, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from "react";
import * as NoteProcessing from '../utils/NoteProcessing';

const windowDimensions = Dimensions.get('window');

export default function JotView() {

  // TODO use useEffect for openNote such that it is only opened once on first render.
  const [content, setContent] = useState(NoteProcessing.openNote());
  const [dimensions, setDimensions] = useState(windowDimensions);
  
  const handleInputChange = useCallback((e: string) => {                                                      
       NoteProcessing.changeNote(e)
       setContent(e)                                                                    
   }, []);                                                                                             

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window}) => {
        setDimensions(window);
      },
    );
    return () => subscription?.remove();
  });

  return (
      <SafeAreaView
        style={styles.container}
      >
        <ScrollView>
        <TextInput 
            style={[styles.contentInput, {height: dimensions.height, width: dimensions.width}]}
            placeholder={ 'hello world '}
            multiline
            value={content} 
            onChangeText={handleInputChange}
        /></ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                                                                                          
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 5,
    paddingRight: 5,
  },

  contentInput: {
    textAlignVertical: 'top'
  }
});
