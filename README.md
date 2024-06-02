# Scratch Paper; single page notes.
A hyper-minimal 'single-page' notes app, for scratch notes and reminders.

The successor to the now deprecated [Jot](https://github.com/Gamemackerel/Jot.), now multi-platform and built with react native.

This is an expo app, start a development server with `npx expo start`

## TODO
* Ensure cursor starts at the bottom

* IOS:
    * Gesturing on TextInput/Scrollview doesnt work, even when using TextInput from Gesture package
        * Currently have a potential untested fix in for this
        * would be good to test in isolation and try and see what Gesture.Native() does. But I currently do not have an iphone to iteratively debug with.

* Build and release on ios store and google store

### Future work
* Add two finger tap to begin dictation
* Swipe left to preview an AI "autocomplete" suggestion, swipe right to confirm suggestion
* Add shake to search text