GuitarShelf - CS 5774 Project 3
Jianpeng Chen | Virginia Tech PID: jianpengc
https://cjpcool.github.io/cs5774/project3/

This simplified version uses the supplied Project 2 ZIP's typography,
three sample pieces, and original local SVG artwork.

PAGES
index.html   Home
browse.html  Three sheet music entries
search.html  Simulated results or friendly no-results message
detail.html  One piece's description and preview
library.html Saved pieces and practice status
add.html     Simple entry-preview form (no upload or publishing)

REQUIRED FEATURES
Search: submit fingerstyle in the header GET form. This one keyphrase shows
three fixed sample results. Other phrases and blank searches show help.
Matching is case-insensitive and ignores outer whitespace.

Interaction 1: click Save to library on Warm Fingerstyle Study. The delegated
jQuery click handler changes the existing card/button and adds a NEW feedback
paragraph. Delegation also works on dynamically created search-result cards.

Interaction 2: open the demo library and change Practice status. The jQuery
change handler uses closest() and find() for DOM traversal, updates the
existing badge/card, and generates a NEW practice-note paragraph.
Neither counted interaction is validation. Saving/status persist locally.

The add page only previews title, composer, difficulty, and description.
Native required controls reject blank or whitespace-only required fields.
Filters, pagination, discussion, accounts, uploads, and delete management
were removed to keep only the essential prototype components.

SOURCE
All pages link styles.css, js/app.js, and local jQuery 3.7.1.
No embedded scripts, inline event handlers, frameworks, or other runtime
libraries are used. Source is commented with four-space indentation.
Official jQuery license: js/vendor/jquery-LICENSE.txt.
Original SVG assets were copied from Project 2 and credited in HTML comments.

TESTING
Verified in Chrome 154 and Firefox 153: GET search, matching/nonmatching/blank
phrases, safe query display, delegated save, status change, reload persistence,
preview form, storage failure feedback, six pages at desktop and 390px mobile,
linked assets and labeled controls. The development check is in work/check-simple.cjs.

LOCAL PREVIEW
From the folder containing cs5774:
    python -m http.server 8000
Visit http://localhost:8000/cs5774/project3/.

CANVAS SUBMISSION
Submit jianpeng-chen-jianpengc.zip and the separate two-page summary PDF.
All links and assets use relative paths; the ZIP preserves cs5774/project3/.

REFERENCES
https://learn.jquery.com/events/event-delegation/
https://api.jquery.com/category/traversing/
https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
