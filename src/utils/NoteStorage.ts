import * as FileSystem from 'expo-file-system';

export function saveNote(content: String): void {
  // This is a placeholder function
  // FileSystem.writeAsStringAsync(fileUri, contents, options)
  console.log('saving');
}

export function loadNote(): String {
  // This is a placeholder function
  // FileSystem.getContentUriAsync(fileUri)
  console.log('loading')
  return 'content'
}

