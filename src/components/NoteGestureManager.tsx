import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useCallback } from 'react';

export default function NoteGestureManager({ children, updateNote }) {
  const clearNote = useCallback(() => updateNote(""), [updateNote]);

  const nativeTextInput = Gesture.Native();
  const fiveTapToClear = Gesture.Tap()
    .numberOfTaps(5)
    .maxDuration(200)
    .onStart(clearNote);

  // This allows the fiveTapGesture to coexist with the
  // native gestures of the child element, but it doesn't automatically
  // compose them (fiveTapToClear still needs its own detector)
  nativeTextInput.simultaneousWithExternalGesture(fiveTapToClear);

  return (
    <GestureDetector gesture={fiveTapToClear}>
        <View>
        <GestureDetector gesture={nativeTextInput}>
          { children }
        </GestureDetector>
        </View>
    </GestureDetector>
  );
}