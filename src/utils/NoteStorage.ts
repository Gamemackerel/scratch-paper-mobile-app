import * as FileSystem from 'expo-file-system';
import { useRef } from 'react';                                                                     

const FILE_PATH = FileSystem.documentDirectory + 'jotooStorage.txt'

export async function saveNoteAsync(content: string): Promise<void> {
  return FileSystem.writeAsStringAsync(FILE_PATH, content)
}

export async function loadNoteAsync(): Promise<string> {
  return FileSystem.readAsStringAsync(FILE_PATH); 
}
