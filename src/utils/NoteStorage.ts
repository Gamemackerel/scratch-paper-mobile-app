import * as FileSystem from 'expo-file-system';

export function saveNote(content: string): void {
  // This is a placeholder function
  // FileSystem.writeAsStringAsync(fileUri, contents, options)
  console.log('saving');
}

export function loadNote(): string {
  // This is a placeholder function
  // FileSystem.getContentUriAsync(fileUri)
  console.log('loading')
  return 'content'
}

