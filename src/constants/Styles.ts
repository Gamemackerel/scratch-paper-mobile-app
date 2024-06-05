import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import ThemeColors from './ThemeColors';


const Styles = StyleSheet.create({
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


export default Styles;
