import * as NoteStorage from "./NoteStorage";


export function openNote(): String {
    console.log('Note Opened');
    const content = NoteStorage.loadNote();
    processReminders(content)
    return content
}


export function changeNote(content: String): void {
    console.log('Note Changed');
    NoteStorage.saveNote(content);
}

export function processReminders(content: String) {
    console.log('Scanning for reminders');
}