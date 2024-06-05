import * as NoteStorage from "./NoteStorage";
import { useRef } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

const DEBOUNCE_DELAY_MS = 750;
const REMINDER_TOKEN = "!";

async function setReminderNotificationsAsync(reminders: string[]): Promise<string[]> {
  return Notifications.getPresentedNotificationsAsync().then(
    (notifications) => {
    const notificationIds = notifications.map((notification) => notification.request.identifier);
    return Promise.all(
      reminders.map(reminder => {
        if (!notificationIds.includes(reminder)) {
          return Notifications.scheduleNotificationAsync({
            content: {
              title: reminder,
            },
            trigger: null,
            identifier: reminder
          });
        } else {
          return reminder;
        }
      })
    );
  });
};

async function removeExtinctNotificationsAsync(reminders: string[]): Promise<void[]> {
  return Notifications.getPresentedNotificationsAsync().then((notifications) => {
    return Promise.all(
      notifications.map(notification => {
        if (!reminders.includes(notification.request.identifier)) {
          return Notifications.dismissNotificationAsync(notification.request.identifier);
        }
        return null;
      })
    );
  });
}

export async function parseRemindersAsync(content: string): Promise<(string[] | void[])[]> {
  const lines = content.split('\n');
  const reminders = lines.filter(line => line.startsWith(REMINDER_TOKEN))
      .map(line => line.substring(REMINDER_TOKEN.length).trim());
  return Promise.all([
    removeExtinctNotificationsAsync(reminders),
    setReminderNotificationsAsync(reminders)
  ])
}

export function openAndParseNote(): Promise<string> {
  const contentPromise = NoteStorage.loadNoteAsync();
  contentPromise.then((content) => parseRemindersAsync(content)).catch(error => {
    Alert.alert("There was an error loading your note", error)
  });
  return contentPromise;
}

export function parseAndSaveNote(content: string): void {
  Promise.all([
    parseRemindersAsync(content),
    NoteStorage.saveNoteAsync(content)
  ]).catch((error) => Alert.alert("There was an error processing your note", error))
}

export function useDebouncedParseAndSave(): Function {
  const timeoutRef = useRef(null);
  const parseAndSaveNoteDebounced = (content: string): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      parseAndSaveNote(content);
    }, DEBOUNCE_DELAY_MS);
  };

  return parseAndSaveNoteDebounced;
}
