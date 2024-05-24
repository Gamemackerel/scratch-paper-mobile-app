import Constants from 'expo-constants';
import { AppState, StyleSheet, Dimensions, SafeAreaView, useColorScheme, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { GestureDetector, Gesture, TextInput, ScrollView } from 'react-native-gesture-handler';
import * as NoteProcessing from '../utils/NoteProcessing';
import * as Notifications from 'expo-notifications';
import { Colors } from '../constants/Colors';


const windowDimensions = Dimensions.get('window');

export default function JotView() {
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState(windowDimensions);
  const [content, setContent] = useState('');
  const [appstate, setAppstate] = useState('active');
  const colorScheme = useColorScheme();
  const parseAndSaveNoteDebounced = NoteProcessing.useDebouncedParseAndSave(750);

  const handleInputChange = useCallback((e: string) => {
    if (!loading) {
      parseAndSaveNoteDebounced(e)
      setContent(e)
    }
  }, [loading]);

  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: false,
        allowAnnouncements: false,
      },
    });

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

  const fiveTapToDelete = Gesture.Tap()
    .numberOfTaps(5)
    .maxDuration(250)
    .onStart(() => {
      console.log('tapped!');
      handleInputChange("");
    });

  return (
    <View style={[{flex: 1},  colorScheme === 'dark' ? styles.dark : styles.light ]}>
      <SafeAreaView
        style={[styles.container]}
        >
        <GestureDetector gesture={fiveTapToDelete}>
          <ScrollView>
              <TextInput
                  style={[styles.contentInput, {height: dimensions.height, width: dimensions.width},
                    colorScheme === 'dark' ? styles.dark : styles.light
                  ]}
                  placeholder={
    `Start typing...

      Tips:
        Begin a line with + to make a reminder
        Tap 5 quickly times to clear

        ` + colorScheme
                  }
                  placeholderTextColor={colorScheme === 'dark' ? Colors.dark.secondaryText: Colors.light.secondaryText}
                  multiline
                  value={content}
                  onChangeText={handleInputChange}
              />
          </ScrollView>
        </GestureDetector>
      </SafeAreaView>
    </View>
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
  },
  light: {
    color: Colors.light.text,
    backgroundColor: Colors.light.background,
  },
  dark: {
    color: Colors.dark.text,
    backgroundColor: Colors.dark.background,
  },
});
