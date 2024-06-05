import { AppState, Dimensions, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import ThemeColors from '../constants/ThemeColors';
import NoteView from './NoteView';
import NoteInput from './NoteInput';
import Styles from '../constants/Styles';


const initialDimensions = Dimensions.get('window');

export default function ScratchPaperNote() {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [appstate, setAppstate] = useState('active');
  const colorScheme = useColorScheme();

  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: false,
        allowAnnouncements: false,
      },
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

  const autoStyle = {
    colors: colorScheme === 'dark' ? Styles.dark : Styles.light,
    placeholderTextColor: colorScheme === 'dark' ? ThemeColors.dark.secondaryText : ThemeColors.light.secondaryText,
    dimensions: {height: dimensions.height, width: dimensions.width}
  }

  return (
    <NoteView autoStyle={autoStyle}>
      <NoteInput autoStyle={autoStyle} appstate={appstate} />
    </NoteView>
  );
}