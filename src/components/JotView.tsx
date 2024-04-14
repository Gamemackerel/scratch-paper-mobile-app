import Constants from 'expo-constants';
import { StyleSheet, TextInput, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";

const windowDimensions = Dimensions.get('window');

export default function JotView() {

  const [content, setContent] = useState("");
  const [dimensions, setDimensions] = useState(windowDimensions);

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
            onChangeText={setContent}
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
