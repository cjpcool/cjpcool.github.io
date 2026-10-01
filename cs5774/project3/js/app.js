/* GuitarShelf behavior. Original application code; jQuery is the only library. */
/* global jQuery */
"use strict";

jQuery(function ($) {
    const storageKey = "guitarshelf-project3";
    const pieces = [
        {
            id: "evening",
            title: "Evening Arpeggios",
            composer: "M. Rivera",
            difficulty: "Beginner",
            description: "A gentle study for an even thumb and a clear melody.",
            image: "sheet-evening.svg",
        },
        {
            id: "warmup",
            title: "Fingerstyle Warm-up",
            composer: "J. Park",
            difficulty: "Beginner",
            description: "Build a relaxed picking pattern with open strings.",
            image: "sheet-warmup.svg",
        },
        {
            id: "melody",
            title: "Melody in A Minor",
            composer: "R. Taylor",
            difficulty: "Intermediate",
            description: "Bring out the melody above a steady bass line.",
            image: "sheet-melody.svg",
        },
        {
            id: "two-chord",
            title: "Two-Chord Fingerstyle",
            composer: "J. Park",
            difficulty: "Beginner",
            description: "Practice smooth changes between two familiar chords.",
            image: "sheet-two-chord.svg",
        },
    ];
    const practiceLabels = { planned: "To practice", practicing: "Practicing", learned: "Learned" };
    const practiceTips = {
        planned: "Ready for your next session. Start slowly and listen for an even pulse.",
        practicing: "Keep going: repeat the tricky passage three times at a comfortable tempo.",
        learned: "Nice progress! Revisit this piece next week to keep it comfortable.",
    };
    let state = { saved: ["evening", "melody"], practice: {}, uploads: [] };
    let pendingDelete = null;

    // Browser storage is demo persistence, never a real account or upload service.
    try {
        const stored = JSON.parse(localStorage.getItem(storageKey));
        if (stored && Array.isArray(stored.saved) && Array.isArray(stored.uploads)) {
            state.saved = stored.saved.filter((id) => pieces.some((piece) => piece.id === id));
            state.practice =
                stored.practice && typeof stored.practice === "object" ? stored.practice : {};
            state.uploads = stored.uploads.filter(
                (entry) => entry && typeof entry.id === "string" && typeof entry.title === "string",
            );
        }
    } catch (error) {
        $("<p>", {
            class: "notice",
            role: "status",
            text: "Your saved demo data could not be read. The sample library is shown; saving a new change will start a fresh demo.",
        }).prependTo("main");
    }

    function persist() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(state));
            return true;
        } catch (error) {
            return false;
        }
    }

    // Populate only a trusted template. Query strings and form input always use .text().
    function makeCard(templateSelector, piece, query) {
        const $card = $($(templateSelector).prop("content")).children().first().clone();
        const url =
            "detail.html?piece=" +
            encodeURIComponent(piece.id) +
            (query ? "&q=" + encodeURIComponent(query) : "");
        $card.attr({ "data-sheet-id": piece.id, "data-title": piece.title });
        $card
            .find("img")
            .attr({
                src: "assets/" + piece.image,
                alt: "Illustrated guitar notation for " + piece.title,
            });
        $card.find(".eyebrow").text(piece.difficulty + " / Standard + TAB");
        $card.find(".piece-link").attr("href", url).text(piece.title);
        $card.find(".open-link").attr("href", url);
        $card.find(".byline").text("By " + piece.composer);
        $card.find(".piece-description").text(piece.description);
        return $card;
    }

    const parameters = new URLSearchParams(window.location.search);
    const query = parameters.get("q") || "";

    // Required simulated search: the GET form navigates here; an if chooses the result.
    // This intentionally matches one fixed keyphrase; it does not search the collection.
    if ($("#search-results").length) {
        const normalizedQuery = query.trim().replace(/\s+/g, " ").toLowerCase();
        $("#search-query").val(query);
        if (normalizedQuery === "fingerstyle") {
            const $grid = $("<div>", { class: "sheet-grid" });
            pieces.forEach((piece) => $grid.append(makeCard("#result-template", piece, query)));
            $("#search-summary").text("4 sample results for “" + query.trim() + "”.");
            $("#search-results").append($grid);
        } else {
            $("#search-summary").text(
                query.trim()
                    ? "No results for “" + query.trim() + "”."
                    : "You haven't entered a search phrase yet.",
            );
            const $notice = $("<div>", { class: "notice" });
            $notice.append($("<h2>").text("Let's try another phrase."));
            $notice.append(
                $("<p>").text(
                    "No sheet music matches this sample search. Try “fingerstyle” in the header, or browse the collection.",
                ),
            );
            $notice.append(
                $("<a>", {
                    class: "button secondary",
                    href: "browse.html",
                    text: "Browse sheet music",
                }),
            );
            $("#search-results").append($notice);
        }
    }

    if ($("#piece-detail").length) {
        const pieceId = parameters.get("piece") || "evening";
        const piece = pieces.find((item) => item.id === pieceId);
        if (piece) {
            $("#piece-detail").attr({ "data-sheet-id": piece.id, "data-title": piece.title });
            $("#detail-title").text(piece.title);
            $("#detail-composer").text("By " + piece.composer);
            $("#detail-level").text(piece.difficulty + " / Standard + TAB");
            $("#detail-description").text(piece.description);
            $("#detail-image").attr({
                src: "assets/" + piece.image,
                alt: "Illustrated " + piece.title + " guitar practice sheet",
            });
            $("#sheet-download").attr("href", "assets/" + piece.image);
            if (parameters.has("q")) {
                $("#back-results").attr("href", "search.html?q=" + encodeURIComponent(query));
            }
            $("title").text(piece.title + " | GuitarShelf");
        } else {
            $("#piece-detail")
                .empty()
                .append(
                    $("<h1>").text("Piece not found"),
                    $("<p>").text(
                        "This sample piece isn't in the collection. Use Back to results to choose another.",
                    ),
                );
        }
    }

    if ($("#saved-pieces").length) {
        const $savedPieces = $("#saved-pieces").empty();
        state.saved.forEach((id) => {
            const piece = pieces.find((item) => item.id === id);
            const $card = makeCard("#saved-template", piece);
            const inputId = "practice-" + id;
            const practice = practiceLabels[state.practice[id]] ? state.practice[id] : "planned";
            $card.find("label").attr("for", inputId);
            $card.find(".practice-select").attr("id", inputId).val(practice);
            $card.find(".practice-badge").text(practiceLabels[practice]);
            $card.addClass("is-" + practice);
            $savedPieces.append($card);
        });
        $("#saved-count").text(
            state.saved.length + " saved " + (state.saved.length === 1 ? "piece" : "pieces"),
        );
        if (!state.saved.length) {
            $savedPieces.append(
                $("<p>", {
                    class: "notice",
                    text: "Your shelf is empty. Browse sheet music and save a piece to get started.",
                }),
            );
        }
    }

    $(".sheet-card").each(function () {
        const $card = $(this);
        if (state.saved.includes($card.attr("data-sheet-id"))) {
            $card
                .find(".save-button")
                .prop("disabled", true)
                .attr("aria-pressed", "true")
                .text("Saved to library ✓");
        }
    });

    // INTERACTION 1 — CLICK with event delegation on the stable main landmark.
    // Handles cards generated after page load, including simulated search results.
    $("main").on("click", ".save-button", function () {
        const $card = $(this).closest(".sheet-card");
        const pieceId = $card.attr("data-sheet-id");
        if (!pieces.some((piece) => piece.id === pieceId) || state.saved.includes(pieceId)) {
            return;
        }
        state.saved.push(pieceId);
        if (!persist()) {
            state.saved.pop();
            $card
                .find(".card-notices")
                .empty()
                .append(
                    $("<p>", {
                        class: "card-feedback error",
                        text: "This browser couldn't save the piece. Allow site storage and try again.",
                    }),
                );
            return;
        }
        // Modify existing elements, then add a NEW feedback paragraph.
        $card.addClass("is-saved");
        $card
            .find(".save-button")
            .text("Saved to library ✓")
            .prop("disabled", true)
            .attr("aria-pressed", "true");
        const $feedback = $("<p>", { class: "card-feedback" }).text(
            $card.attr("data-title") + " is now on your shelf. ",
        );
        $feedback.append($("<a>", { href: "library.html", text: "Open My Library" }));
        $card.find(".card-notices").empty().append($feedback);
    });

    // INTERACTION 2 — CHANGE, bound after the saved cards have been created.
    // DOM traversal: closest() finds the card; find() scopes badge and note updates.
    $(".practice-select").on("change", function () {
        const $card = $(this).closest(".sheet-card");
        const pieceId = $card.attr("data-sheet-id");
        const practice = $(this).val();
        if (!practiceLabels[practice]) {
            return;
        }
        const previous = state.practice[pieceId] || "planned";
        state.practice[pieceId] = practice;
        if (!persist()) {
            state.practice[pieceId] = previous;
            $(this).val(previous);
            $card
                .find(".card-notices")
                .empty()
                .append(
                    $("<p>", {
                        class: "practice-note error",
                        text: "The practice status couldn't be saved. Allow site storage and try again.",
                    }),
                );
            return;
        }
        // Modify the existing badge/card, then generate a NEW practice-note paragraph.
        $card.removeClass("is-planned is-practicing is-learned").addClass("is-" + practice);
        $card.find(".practice-badge").text(practiceLabels[practice]);
        $card
            .find(".card-notices")
            .empty()
            .append($("<p>", { class: "practice-note", text: practiceTips[practice] }));
    });

    // Additional supporting flow: native required controls plus one validation handler.
    $("#add-form").on("submit", function (event) {
        event.preventDefault();
        const $form = $(this);
        const title = $("#piece-title").val().trim();
        const composer = $("#piece-composer").val().trim();
        const description = $("#piece-description").val().trim();
        const file = $("#piece-file").prop("files")[0];
        $form.find(".field-error").removeClass("field-error").removeAttr("aria-invalid");
        const invalid = [
            ["#piece-title", title],
            ["#piece-composer", composer],
            ["#piece-description", description],
        ].find((field) => !field[1]);
        if (invalid || !file || !/\.pdf$/i.test(file.name)) {
            const selector = invalid ? invalid[0] : "#piece-file";
            $(selector).addClass("field-error").attr("aria-invalid", "true").trigger("focus");
            $("#form-status")
                .empty()
                .append(
                    $("<p>", {
                        class: "notice error",
                        text: invalid
                            ? "Please enter meaningful text in the highlighted required field."
                            : "Choose a PDF file ending in .pdf.",
                    }),
                );
            return;
        }
        state.uploads.push({
            id: "upload-" + Date.now(),
            title: title,
            composer: composer,
            difficulty: $("#piece-difficulty").val(),
            notation: $("#piece-notation").val(),
            description: description,
            tags: $("#piece-tags").val().trim(),
            visibility: $form.find("[name='visibility']:checked").val(),
            filename: file.name,
        });
        if (!persist()) {
            state.uploads.pop();
            $("#form-status")
                .empty()
                .append(
                    $("<p>", {
                        class: "notice error",
                        text: "Your entry couldn't be saved. Allow site storage and try again; your form information is still here.",
                    }),
                );
            return;
        }
        window.location.href = "library.html?added=1#uploads";
    });

    function renderUploads() {
        const $list = $("#upload-list").empty();
        $("#uploads-empty").prop("hidden", state.uploads.length > 0);
        state.uploads.forEach((entry) => {
            const $row = $("<article>", { class: "upload-row", "data-upload-id": entry.id });
            const $copy = $("<div>");
            $copy.append($("<h3>").text(entry.title));
            $copy.append(
                $("<p>", { class: "small" }).text(
                    entry.composer + " / " + entry.difficulty + " / " + entry.visibility,
                ),
            );
            $copy.append(
                $("<p>", { class: "small" }).text(
                    "PDF filename: " + entry.filename + " (file not stored)",
                ),
            );
            $copy.append($("<p>").text(entry.description));
            $row.append(
                $copy,
                $("<button>", {
                    type: "button",
                    class: "button secondary delete-upload",
                    text: "Delete",
                    "aria-label": "Delete " + entry.title,
                }),
            );
            $list.append($row);
        });
    }

    if ($("#upload-list").length) {
        renderUploads();
        if (parameters.get("added") === "1") {
            $("#upload-status").append(
                $("<p>", {
                    class: "notice",
                    text: "Your entry was added to this browser's demo uploads. No file was uploaded.",
                }),
            );
            // Consume the success marker so a later reload cannot repeat stale feedback.
            window.history.replaceState(null, "", "library.html#uploads");
        }
    }

    $("#upload-list").on("click", ".delete-upload", function () {
        pendingDelete = $(this).closest(".upload-row").attr("data-upload-id");
        $("#delete-dialog").get(0).showModal();
        $("#cancel-delete").trigger("focus");
    });
    $("#cancel-delete").on("click", function () {
        $("#delete-dialog").get(0).close();
        pendingDelete = null;
    });
    $("#confirm-delete").on("click", function () {
        const previousUploads = state.uploads;
        state.uploads = state.uploads.filter((entry) => entry.id !== pendingDelete);
        if (!persist()) {
            state.uploads = previousUploads;
            $("#upload-status")
                .empty()
                .append(
                    $("<p>", {
                        class: "notice error",
                        text: "The entry couldn't be deleted. Allow site storage and try again.",
                    }),
                );
        } else {
            renderUploads();
            $("#upload-status")
                .empty()
                .append(
                    $("<p>", {
                        class: "notice",
                        text: "Entry deleted from this browser's demo uploads.",
                    }),
                );
        }
        $("#delete-dialog").get(0).close();
        pendingDelete = null;
        $("#uploads-title").attr("tabindex", "-1").trigger("focus");
    });
});
