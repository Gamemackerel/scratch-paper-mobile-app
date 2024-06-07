import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { useCallback, ReactNode } from 'react';

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
    .maxDuration(200)
    .onStart(clearNote);

  // This allows the fiveTapGesture to coexist with the
  // native gestures of the child elements, but it doesn't automatically
  // compose them (fiveTapToClear still needs its own detector)
  // Thus we have 3 detectors, one for the custom gestures,
  // one for the scrollView, and one for the textInput
  nativeTextInput.simultaneousWithExternalGesture(fiveTapToClear);
  nativeScroll.simultaneousWithExternalGesture(nativeScroll);

  return (
    <GestureDetector gesture={fiveTapToClear}>
      <GestureDetector gesture={nativeScroll}>
        <ScrollView
          keyboardDismissMode='on-drag'
        >
          <GestureDetector gesture={nativeTextInput}>
              { children }
          </GestureDetector>
        </ScrollView>
      </GestureDetector>
    </GestureDetector>
  );
}