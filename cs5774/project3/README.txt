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
add two-column form. Search results and login are additional pages.
Only runtime library: the required, locally stored jQuery 3.7.1.

Three real one-page guitar scores and three playable audio files are included.
Carcassi audio is a guitar performance; both Sor examples are synthesized MIDI
playback supplied by the edition maintainer. Full credits/licenses and source
links are in assets/credits.txt and on each detail page. PDFs/audio unchanged;
PNG previews render the original PDFs. Practice levels are editorial estimates.
The Add page previews metadata, a selected filename and visibility preference;
it does not upload or publish files. Notes on a detail page last until navigation.
login.html provides a jQuery simulated login: jianpengc / guitar123.
The login page responds to Project 1B feedback, as confirmed by the student.
Only the demo username is stored in sessionStorage, never the password.
Guests may browse/search/read/listen. Saving, notes, library and add require login.
Successful login returns to the requested local page; logout returns home.
The session is a UI simulation, not server authentication or an access-control boundary.
There is no backend. Storage failure is reported without a false success.

Requirement map (also described in the separate two-page summary):
- 35 pts search: header GET form -> search.html; explicit if/else; jQuery results/help.
- 30 pts interactions: delegated click saves; change + closest/find updates practice.
  Each changes existing elements AND creates a new paragraph. Neither is validation.
  Login validation is separate from these two counted interactions.
- 10 pts hosting: cs5774/project3/index.html; relative paths throughout.
- 20 pts code: original external js/app.js, shared CSS, only jQuery, named sections
  and explanatory comments; four-space formatting; Chrome/Firefox verification.
- 5 pts documentation: two pages, application context + requirements/keyphrase/URL.
The original five Project 2 page structures remain; search/login add two pages.
No registration, real accounts or extra libraries are needed for this prototype.

GitHub deployment uses the authenticated cjpcool account and the commit display
name jianpengc. No separate GitHub account is impersonated or renamed.
All navigation, script, stylesheet and media paths are relative to this folder.
Summary PDF is submitted separately from the ZIP; score PDFs belong in the ZIP.
