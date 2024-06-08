import { AppState, Dimensions, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import NoteView from './src/components/NoteView';
import NoteInput from './src/components/NoteInput';
import { Styles, ThemeColors, AutoStyleInfo } from './src/constants/Styles';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return (
      {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
      }
    )
  },
});

const initialDimensions = Dimensions.get('window');

export default function NoteRoot() {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [appState, setAppstate] = useState('active');
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
      'change', ({window}) => setDimensions(window)
    );
    const appStateSubscription = AppState.addEventListener(
      'change', setAppstate
    );

    return () => {
      dimensionsSubscription?.remove();
      appStateSubscription?.remove();
    };
  }, []);

  const autoStyle : AutoStyleInfo = {
    colors: colorScheme === 'dark' ? Styles.dark : Styles.light,
    placeholderTextColor: colorScheme === 'dark' ?
      ThemeColors.dark.secondaryText : ThemeColors.light.secondaryText,
    dimensions: {height: dimensions.height, width: dimensions.width}
  }

  return (
    <NoteView autoStyle={autoStyle}>
      <NoteInput autoStyle={autoStyle} appState={appState} />
    </NoteView>
  );
}