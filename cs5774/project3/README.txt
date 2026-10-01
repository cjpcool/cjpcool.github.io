GuitarShelf — CS 5774 Project 3
Jianpeng Chen | PID / uploader: jianpengc
Hosted URL: https://cjpcool.github.io/cs5774/project3/

Open index.html; serve the folder over HTTP for persistent browser storage.
Header search submits GET to search.html?q=... . Keyphrase: fingerstyle
(case-insensitive; surrounding spaces ignored). Other phrases show friendly help.

Two required jQuery interactions in js/app.js:
1. Delegated click on .save-button: changes button/card and adds a feedback paragraph.
2. change on .practice-select: closest()/find() update card/badge and add a practice note.
Both persist in localStorage; neither is validation.

Pages retain Project 2's structure: home hero + cards, browse filter + list,
detail preview/notes + sidebar, library saved cards + uploads section,
add two-column form. Search results is the additional required page.
Only runtime library: the required, locally stored jQuery 3.7.1.

Three real one-page guitar scores and three playable audio files are included.
Carcassi audio is a guitar performance; both Sor examples are synthesized MIDI
playback supplied by the edition maintainer. Full credits/licenses and source
links are in assets/credits.txt and on each detail page. PDFs/audio unchanged;
PNG previews render the original PDFs. Practice levels are editorial estimates.
The Add page previews metadata, a selected filename and visibility preference;
it does not upload or publish files. Notes on a detail page last until navigation.
There is no login/backend. Storage failure is reported without a false success.

GitHub deployment uses the authenticated cjpcool account and the commit display
name jianpengc. No separate GitHub account is impersonated or renamed.
All navigation, script, stylesheet and media paths are relative to this folder.
Summary PDF is submitted separately from the ZIP; score PDFs belong in the ZIP.
