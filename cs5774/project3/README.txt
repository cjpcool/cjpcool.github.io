GuitarShelf - CS 5774 Project 3
Jianpeng Chen | Virginia Tech PID: jianpengc

LIVE PROJECT
https://cjpcool.github.io/cs5774/project3/

PAGES
index.html   Public home (default directory entry)
browse.html  Sheet music collection
search.html  Simulated search results / no-results state
detail.html  Sheet music detail and preview
library.html Demo library and local uploads
add.html     Add a demo entry

TRY THE REQUIRED INTERACTIONS
1. In the header, search for fingerstyle. The GET form sends q to search.html.
   This one keyphrase returns four simulated results. Capitalization and outer
   whitespace are ignored. Other phrases, or an empty phrase, show a helpful
   no-results message. This does not perform a real search.
2. On the results page, save Fingerstyle Warm-up. The delegated click handler
   changes the existing card and button, then creates a feedback paragraph.
   The initially saved sample pieces are Evening Arpeggios and Melody in A Minor.
3. Open My Library. Change a piece's Practice status. The change handler uses
   closest() and find() to update the card/badge and create a practice-note
   paragraph. It is a different event type and is not form validation.
4. Reload to check that saved pieces and practice statuses persist.

SUPPORTING FLOW
Add a title, composer, difficulty, notation, description and PDF filename on
add.html. Check the permission box and submit. The entry appears in demo
uploads. Delete opens a confirmation dialog; Keep entry cancels deletion.
The file itself is not uploaded or stored. Public/private are demo labels,
not access controls. The prototype has no backend or real authentication.

CODE AND DEPENDENCIES
All pages link styles.css and js/app.js. There are no inline event handlers,
embedded scripts, front-end frameworks, or runtime libraries beyond jQuery.
jQuery 3.7.1 is vendored locally so the project does not require a CDN.
The vendor file is the official library, not student application code.
Its copyright/license is in js/vendor/jquery-LICENSE.txt.
All SVG images are original illustrations with source comments.
Application source uses four-space indentation and descriptive names.

LOCAL PREVIEW
From the folder containing cs5774, run:
    python -m http.server 8000
Then visit http://localhost:8000/cs5774/project3/.
Use HTTP or the hosted site when testing browser storage, rather than file://.

BROWSER CHECKLIST
Verified in real Chrome and Firefox with automated browser checks:
- GET form navigation, matching/nonmatching/empty search, mixed case/spaces
- Safe display of query text (no HTML insertion from user input)
- Delegated save on dynamically generated cards and persistent saved state
- Change interaction, traversal, new practice note, reload persistence
- Required controls, whitespace validation, add, cancel delete, confirm delete
- Six pages at desktop and 390px mobile widths, linked assets and input labels
The check script is retained in the working folder, separate from submission.

DESIGN REFERENCE
This iteration follows the available GuitarShelf design PDF and the Project 2
conversation's recorded refinements: simple black-and-white presentation,
sheet-music terminology, one header search, Back to results, demo workspace
navigation, clear status messages, required fields, and delete confirmation.
The actual Project 2 ZIP was not accessible in the referenced chat, so this is
a reconstruction of that design direction rather than a verified file-level edit.

SUBMISSION
Submit jianpeng-chen-jianpengc.zip and the separate Project 3 Summary PDF to Canvas.
The ZIP preserves the required cs5774/project3/ folder and all relative assets.

REFERENCE DOCUMENTATION
https://learn.jquery.com/events/event-delegation/
https://api.jquery.com/category/traversing/
https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
