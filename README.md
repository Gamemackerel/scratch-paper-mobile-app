# Scratch Paper; single page notes.
A hyper-minimal 'single-page' notes app, for scratch notes and reminders.

The successor to the now deprecated [Jot]([url](https://github.com/Gamemackerel/Jot.)), now multi-platform and built with react native.

This is an expo app, start a development server with `npx expo start`

## TODO
* Add shake to search text
* Ensure cursor starts at the bottom
* Fix dark/light system theme inheritance

* IOS:
    * Gesturing on TextInput/Scrollview doesnt work, even when using TextInput Gesture
        * Currently have a potential fix in for this
        * would be good to test in isolation and try and see what Gesture.Native() does.
     
* Build and release on ios store and google store

### Future work
* Add two finger tap to begin dictation
* Swipe left to preview an AI "autocomplete" suggestion, swipe right to confirm suggestion
