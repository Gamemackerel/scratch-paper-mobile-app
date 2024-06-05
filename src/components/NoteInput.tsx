import { TextInput } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as NoteProcessing from '../utils/NoteProcessing';
import { Styles, AutoStyleInfo } from '../constants/Styles';
import { placeholderText } from '../constants/Strings';
import NoteGestureManager from './NoteGestureManager';

interface NoteInputProps {
  autoStyle: AutoStyleInfo;
  appState: string;
}
export default function NoteInput({ autoStyle, appState } : NoteInputProps) {
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
  }, [appState]);

  return (
    <NoteGestureManager updateNote={updateNote}>
      <TextInput
        style={[Styles.contentInput, autoStyle.colors, autoStyle.dimensions]}
        placeholder={placeholderText}
        placeholderTextColor={autoStyle.placeholderTextColor}
        multiline
        value={content}
        onChangeText={updateNote}
      />
    </NoteGestureManager>
  );
}