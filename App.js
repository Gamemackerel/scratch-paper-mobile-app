import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Dimensions, SafeAreaView, Platform } from 'react-native';
import React, { useState, useEffect } from "react";

const windowDimensions = Dimensions.get('window');

export default function App() {

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
        <TextInput 
            style={[styles.contentInput, {height: dimensions.height}]}
            placeholder="Enter note content"
            multiline
            value={content} 
            onChangeText={setContent}
        />
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  contentInput: {
    outlineStyle: 'none',
    paddingTop: '0.5em',
    paddingLeft: '0.5em',
    paddingRight: '0.5em'
  }
});
