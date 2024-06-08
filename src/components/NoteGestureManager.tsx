import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { useCallback, ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface NoteGestureManagerProps {
  children: ReactNode;
  updateNote: (e: string) => void;
}

export default function NoteGestureManager({ children, updateNote }: NoteGestureManagerProps) {
  const clearNote = useCallback(() => updateNote(""), [updateNote]);

  const nativeScroll = Gesture.Native();
  const nativeTextInput = Gesture.Native();
  const fiveTapToClear = Gesture.Tap()
    .numberOfTaps(5)
    .maxDuration(250)
    .maxDeltaY(50)
    .maxDeltaX(50)
    .onStart(clearNote);

  nativeTextInput.simultaneousWithExternalGesture(fiveTapToClear);
  nativeScroll.simultaneousWithExternalGesture(fiveTapToClear);

  return (
    <GestureDetector gesture={fiveTapToClear}>
      <GestureDetector gesture={nativeScroll}>
        <KeyboardAwareScrollView
          keyboardDismissMode={Platform.OS == 'ios' ? 'interactive' : 'on-drag'}
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS == 'ios' ? true : false}
        >
          <GestureDetector gesture={nativeTextInput}>
              { children }
          </GestureDetector>
        </KeyboardAwareScrollView>
      </GestureDetector>
    </GestureDetector>
  );
}