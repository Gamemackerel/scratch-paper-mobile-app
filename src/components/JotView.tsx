import Constants from 'expo-constants';
import { AppState, StyleSheet, TextInput, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as NoteProcessing from '../utils/NoteProcessing';

const windowDimensions = Dimensions.get('window');

export default function JotView() {
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState(windowDimensions);
  const [content, setContent] = useState('');
  const saveNoteAndProcessRemindersDebounced = NoteProcessing.useDebouncedUpdateNote();

  const handleInputChange = useCallback((e: string) => {
    if (!loading) {
      saveNoteAndProcessRemindersDebounced(e)
      setContent(e)
    }
  }, [loading]);

  useEffect(() => {
    NoteProcessing.openNote().then((loadedContent) => {
      setContent(loadedContent);
      setLoading(false);
    })

    const dimensionsSubscription = Dimensions.addEventListener(
      'change',
      ({window}) => {
        setDimensions(window);
      },
    );

    const appStateSubscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        NoteProcessing.processReminders(content);
      }
    });

    return () => {
      dimensionsSubscription?.remove();
      appStateSubscription?.remove();
    };
  }, []);

  return (
      <SafeAreaView
        style={styles.container}
      >
        <ScrollView>
        <TextInput
            style={[styles.contentInput, {height: dimensions.height, width: dimensions.width}]}
            placeholder={ `Start typing...

  Tips:
    Begin a line with -- to make a reminder
    Tap 5 quickly times to clear
    Two finger tap to preview an AI suggestion
    Swipe right to confirm suggestion
            ` }
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
