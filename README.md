# jotoo
A cross platform 'single-page' notes app, for scratch notes and reminders.


This is an expo app, start a development server with `npx expo start`


## TODO
* Two finger tap to preview an AI "autocomplete" suggestion
* Swipe right to confirm suggestion

* IOS:
    * Gesturing on TextInput/Scrollview doesnt work, even when using TextInput Gesture
        * Currently have a potential fix in for this
        * would be good to test in isolation and try and see what Gesture.Native() does.