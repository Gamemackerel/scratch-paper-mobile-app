import * as FileSystem from 'expo-file-system';

const FILE_PATH = FileSystem.documentDirectory + 'scratch-paper-storage.txt'

export async function saveNoteAsync(content: string): Promise<void> {
  return FileSystem.writeAsStringAsync(FILE_PATH, content);
}

export async function loadNoteAsync(): Promise<string> {
  return FileSystem.getInfoAsync(FILE_PATH).then((fileInfo) => {
    if (fileInfo.exists) {
      return FileSystem.readAsStringAsync(FILE_PATH);
    } else {
      return FileSystem.writeAsStringAsync(FILE_PATH, "").then(() => "");
    }
  })
  }
