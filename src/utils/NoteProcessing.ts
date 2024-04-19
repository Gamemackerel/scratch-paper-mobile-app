import * as NoteStorage from "./NoteStorage";
import { useRef } from "react";
import * as Notifications from "expo-notifications";




async function generateReminderNotificationAsync(reminder: string): Promise<string> {
    return Notifications.scheduleNotificationAsync({
    content: {
      title: reminder,
      body: null
    },
    trigger: null,
    identifier: reminder
  });
};

export function openNote(): Promise<string> {
  console.log('Note Opened');
  const contentPromise = NoteStorage.loadNoteAsync();
  contentPromise.then((content) => processReminders(content))
  return contentPromise;
}

export function processReminders(content: string) {
  console.log('processing reminders');
  const lines = content.split('\n');
  const reminders = lines.filter(line => line.startsWith('--')).map(line => line.substring(2).trim());
  reminders.forEach(reminder => {
    generateReminderNotificationAsync(reminder);
  });
}

function updateNote(content: string): void {
  console.log('Note updated');
  NoteStorage.saveNoteAsync(content);
  processReminders(content);
}

export function useDebouncedUpdateNote(): Function {
  const timeoutRef = useRef(null);
  const delay = 2000;

  const updateNoteDebounced = (content: string): void => {
    console.log('Note requested update');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      updateNote(content);
    }, delay);
  };

  return updateNoteDebounced;
}
