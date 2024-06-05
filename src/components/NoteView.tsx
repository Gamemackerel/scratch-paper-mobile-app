import { SafeAreaView, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Styles, AutoStyleInfo } from '../constants/Styles';
import { ReactNode } from 'react';

interface NoteViewProps {
  children: ReactNode;
  autoStyle: AutoStyleInfo;
}

export default function NoteView({ children, autoStyle } : NoteViewProps) {
  return (
    <View style={[Styles.containerView,  autoStyle.colors ]}>
      <SafeAreaView>
        <KeyboardAvoidingView>
          <ScrollView>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
