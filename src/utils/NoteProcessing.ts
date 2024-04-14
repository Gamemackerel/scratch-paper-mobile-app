import * as NoteStorage from "./NoteStorage";


export function openNote(): string {
    console.log('Note Opened');
    const content = NoteStorage.loadNote();
    processReminders(content)
    return content
}


export function changeNote(content: string): void {
    console.log('Note Changed');
    NoteStorage.saveNote(content);
}

export function processReminders(content: string) {
    console.log('Scanning for reminders');
}