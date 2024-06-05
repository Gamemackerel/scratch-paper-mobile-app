import ScratchPaperNote from "./src/components/ScratchPaperNote";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return (
      {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
      }
    )
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScratchPaperNote/>
    </GestureHandlerRootView>
  );
}
