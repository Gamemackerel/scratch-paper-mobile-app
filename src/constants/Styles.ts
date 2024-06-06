import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export const ThemeColors = {
  light: {
    text: '#5A5A5A',
    background: '#FBF6F0',
    secondaryText: '#C0B9B2'
  },
  dark: {
    text: '#F0EDEB',
    background: '#4B4845',
    secondaryText: '#C0B9B2'
  },
};

export const Styles = StyleSheet.create({
  containerView: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10
  },
  contentInput: {
    textAlignVertical: 'top',
    fontSize: 16
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
