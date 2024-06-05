import { TextInput } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as NoteProcessing from '../utils/NoteProcessing';
import Styles from '../constants/Styles';
import NoteGestureManager from './NoteGestureManager';

export default function NoteInput({ autoStyle, appstate }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const parseAndSaveNoteDebounced = NoteProcessing.useDebouncedParseAndSave();

  const updateNote = useCallback((e: string) => {
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

  }, []);

  useEffect(() => {
    if (!loading) {
      NoteProcessing.parseAndSaveNote(content);
    }
  }, [appstate, loading]);

  return (
    <NoteGestureManager updateNote={updateNote}>
      <TextInput
          style={[Styles.contentInput, autoStyle.colors, autoStyle.dimensions]}
          placeholder={
`Start typing...

  Tips:
    Begin a line with :: to make a reminder
    Tap 5 quickly times to clear
`
        }
        placeholderTextColor={autoStyle.placeholderTextColor}
        multiline
        value={content}
        onChangeText={updateNote}
      />
    </NoteGestureManager>
  );
}