import Constants from 'expo-constants';
import { StyleSheet, TextInput, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as NoteProcessing from '../utils/NoteProcessing';

const windowDimensions = Dimensions.get('window');

export default function JotView() {
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState(windowDimensions);
  const [content, setContent] = useState('');

  // Saves the note to storage and processes changes
  const updateNoteDebounced = NoteProcessing.useDebouncedUpdateNote();

  const handleInputChange = useCallback((e: string) => {
    if (!loading) {
      updateNoteDebounced(e)
      setContent(e)
    }
  }, [loading]);

  // Initial one-time startup on component mount
  useEffect(() => {
    // load initial content to textBox
    NoteProcessing.openNote().then((loadedContent) => {
      setContent(loadedContent);
      setLoading(false);
    })

    // subscribe to dimensions
    const dimensionsSubscription = Dimensions.addEventListener(
      'change',
      ({window}) => {
        setDimensions(window);
      },
    );

    // final cleanup on component dismount
    return () => {
      dimensionsSubscription?.remove()
    };
  }, []);

  return (
      <SafeAreaView
        style={styles.container}
      >
        <ScrollView>
        <TextInput
            style={[styles.contentInput, {height: dimensions.height, width: dimensions.width}]}
            placeholder={ 'start typing...' }
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
