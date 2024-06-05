import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export const ThemeColors = {
  light: {
    text: '#11181C',
    background: '#fff',
    secondaryText: '#A3A3A3'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    secondaryText: '#A3A3A3'
  },
};

export const Styles = StyleSheet.create({
  containerView: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 5,
    paddingRight: 5
  },
  contentInput: {
    textAlignVertical: 'top'
  },
  light: {
    color: ThemeColors.light.text,
    backgroundColor: ThemeColors.light.background,
  },
  dark: {
    color: ThemeColors.dark.text,
    backgroundColor: ThemeColors.dark.background,
  },
});


// Used to pass certain computed style
// info down the componenet tree
export type AutoStyleInfo = {
  colors: {
    color: string;
    backgroundColor: string;
  };
  placeholderTextColor: string;
  dimensions: {
      height: number;
      width: number;
  };
};

export default Styles;
