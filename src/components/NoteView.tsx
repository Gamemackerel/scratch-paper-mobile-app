import { SafeAreaView, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Styles, AutoStyleInfo } from '../constants/Styles';
import { ReactNode } from 'react';

interface NoteViewProps {
  children: ReactNode;
  autoStyle: AutoStyleInfo;
}

export default function NoteView({ children, autoStyle } : NoteViewProps) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={[Styles.containerView,  autoStyle.colors ]}>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <ScrollView>
              {children}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}
