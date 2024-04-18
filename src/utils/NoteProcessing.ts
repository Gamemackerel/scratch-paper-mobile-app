import * as NoteStorage from "./NoteStorage";
import { useRef } from "react";

export function openNote(): Promise<string> {
  console.log('Note Opened');
  const contentPromise = NoteStorage.loadNoteAsync();
  contentPromise.then((content) => processReminders(content))
  return contentPromise;
}

function processReminders(content: string) {
  console.log('processing reminders');
  const lines = content.split('\n');
  const reminders = lines.filter(line => line.startsWith('--')).map(line => line.substring(2).trim());
  console.log(reminders);
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
