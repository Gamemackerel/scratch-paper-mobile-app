import { SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Styles, AutoStyleInfo } from '../constants/Styles';
import { ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';


interface NoteViewProps {
  children: ReactNode;
  autoStyle: AutoStyleInfo;
}

export default function NoteView({ children, autoStyle } : NoteViewProps) {
  return (
    <KeyboardProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar/>
        <View style={[Styles.containerView,  autoStyle.colors ]}>
          <SafeAreaView>
            {children}
          </SafeAreaView>
        </View>
      </GestureHandlerRootView>
    </KeyboardProvider>
  );
}
