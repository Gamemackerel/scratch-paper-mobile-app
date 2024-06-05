import { SafeAreaView, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import Styles from '../constants/Styles';

export default function NoteView({ children, autoStyle }) {
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
