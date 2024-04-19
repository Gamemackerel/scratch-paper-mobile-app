import Constants from 'expo-constants';
import { AppState, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { GestureDetector, Gesture, TextInput, ScrollView } from 'react-native-gesture-handler';
import * as NoteProcessing from '../utils/NoteProcessing';

const windowDimensions = Dimensions.get('window');

export default function JotView() {
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState(windowDimensions);
  const [content, setContent] = useState('');
  const [appstate, setAppstate] = useState('active');
  const parseAndSaveNoteDebounced = NoteProcessing.useDebouncedParseAndSave(750);

  const handleInputChange = useCallback((e: string) => {
    if (!loading) {
      parseAndSaveNoteDebounced(e)
      setContent(e)
    }
  }, [loading]);

  useEffect(() => {
    NoteProcessing.openAndParseNote().then((loadedContent) => {
      setContent(loadedContent);
      setLoading(false);
    });

    const dimensionsSubscription = Dimensions.addEventListener(
      'change',
      ({window}) => {
        setDimensions(window);
      },
    );

    const appStateSubscription = AppState.addEventListener('change', setAppstate);

    return () => {
      dimensionsSubscription?.remove();
      appStateSubscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      NoteProcessing.parseAndSaveNote(content);
    }
  }, [appstate, loading]);

  const tap = Gesture.Tap()
    .numberOfTaps(5)
    .maxDuration(250)
    .onStart(() => {
      handleInputChange("");
    });

  return (
    <GestureDetector gesture={tap}>
      <SafeAreaView
        style={styles.container}
      >
        <ScrollView>
          <TextInput
              style={[styles.contentInput, {height: dimensions.height, width: dimensions.width}]}
              placeholder={
`Start typing...

  Tips:
    Begin a line with + to make a reminder
    Tap 5 quickly times to clear
    `
              }
              multiline
              value={content}
              onChangeText={handleInputChange}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureDetector>
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
