/* Original Project 3 behavior. jQuery is the only runtime library. */
/* global jQuery */
"use strict";

jQuery(function ($) {
    // These sample entries and illustrations come from the supplied Project 2.
    const pieces = [
        {
            id: "evening",
            title: "Evening Arpeggios",
            composer: "Anonymous study",
            difficulty: "Intermediate",
            description:
                "A calm E minor arpeggio study for building right-hand control and steady timing.",
            image: "score-evening.svg",
        },
        {
            id: "warmup",
            title: "Warm Fingerstyle Study",
            composer: "Community exercise",
            difficulty: "Intermediate",
            description: "A short fingerstyle pattern for alternating bass and melody.",
            image: "score-fingerstyle.svg",
        },
        {
            id: "chords",
            title: "Open Chord Changes",
            composer: "Community exercise",
            difficulty: "Beginner",
            description: "A beginner exercise for moving smoothly between G, C, D, and Em.",
            image: "score-chords.svg",
        },
    ];
    const labels = { planned: "To practice", practicing: "Practicing", learned: "Learned" };
    const tips = {
        planned: "Start slowly and listen for an even pulse.",
        practicing: "Repeat the tricky passage three times at a comfortable tempo.",
        learned: "Nice progress! Revisit this piece next week.",
    };
    const storageKey = "guitarshelf-project3-simple";
    let library = { evening: "planned" };
    const parameters = new URLSearchParams(window.location.search);
    const query = parameters.get("q") || "";

    // Store only practice statuses for the three known sample pieces.
    try {
        const stored = JSON.parse(localStorage.getItem(storageKey));
        if (stored && typeof stored === "object" && !Array.isArray(stored)) {
            library = {};
            pieces.forEach((piece) => {
                if (Object.hasOwn(labels, stored[piece.id])) library[piece.id] = stored[piece.id];
            });
        }
    } catch (error) {
        $("<p>", {
            class: "status",
            text: "Saved demo data could not be read. The sample library is shown.",
        }).prependTo("main");
    }

    function persist() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(library));
            return true;
        } catch (error) {
            return false;
        }
    }

    // Reused by search and library. Text is inserted safely, never as user HTML.
    function createCard(piece, isLibrary) {
        const $card = $($("#piece-template").prop("content")).children().first().clone();
        $card.attr("data-sheet-id", piece.id);
        $card.find("img").attr({ src: "assets/" + piece.image, alt: "Preview of " + piece.title });
        $card.find(".piece-title").text(piece.title);
        $card.find(".meta").text(piece.difficulty + " · " + piece.composer);
        $card.find(".piece-description").text(piece.description);
        $card
            .find(".open-link")
            .attr(
                "href",
                "detail.html?piece=" + piece.id + (query ? "&q=" + encodeURIComponent(query) : ""),
            );
        if (isLibrary) {
            $card.find(".save-button").remove();
            $card.find("label").attr("for", "practice-" + piece.id);
            $card
                .find("select")
                .attr("id", "practice-" + piece.id)
                .val(library[piece.id]);
            $card.find(".practice-badge").text(labels[library[piece.id]]);
            $card.addClass("is-" + library[piece.id]);
        } else {
            $card.find(".practice-controls").remove();
        }
        return $card;
    }

    // Required simulated search: GET supplies q; an if chooses results or help.
    if ($("#search-results").length) {
        $("#site-q").val(query);
        if (query.trim().toLowerCase() === "fingerstyle") {
            $("#search-summary").text("3 sample results for “" + query.trim() + "”.");
            pieces.forEach((piece) => $("#search-results").append(createCard(piece, false)));
        } else {
            $("#search-summary").text(
                query.trim()
                    ? "No results for “" + query.trim() + "”."
                    : "No search phrase entered.",
            );
            $("#results-title").text("Try another phrase");
            $("#search-results").append(
                $("<p>", {
                    class: "status",
                    text: "No sheet music matches this sample search. Try “fingerstyle” in the header, or browse the collection.",
                }),
            );
        }
    }

    if ($("#piece-detail").length) {
        const piece = pieces.find((item) => item.id === (parameters.get("piece") || "evening"));
        if (piece) {
            $("#piece-detail").attr("data-sheet-id", piece.id);
            $("#detail-title").text(piece.title);
            $("#detail-meta").text(piece.difficulty + " · " + piece.composer);
            $("#detail-description").text(piece.description);
            $("#detail-image").attr({
                src: "assets/" + piece.image,
                alt: piece.title + " sheet music preview",
            });
            $("title").text(piece.title + " | GuitarShelf");
        } else {
            $("#piece-detail")
                .empty()
                .append(
                    $("<h1>").text("Piece not found"),
                    $("<p>").text("Use Back to results to choose another piece."),
                );
        }
        if (parameters.has("q"))
            $("#back-results").attr("href", "search.html?q=" + encodeURIComponent(query));
    }

    if ($("#saved-pieces").length) {
        pieces
            .filter((piece) => Object.hasOwn(library, piece.id))
            .forEach((piece) => {
                $("#saved-pieces").append(createCard(piece, true));
            });
        if (!Object.keys(library).length)
            $("#saved-pieces").append(
                $("<p>", {
                    class: "status",
                    text: "Your library is empty. Browse sheet music to save a piece.",
                }),
            );
    }

    $(".sheet-card").each(function () {
        if (Object.hasOwn(library, $(this).attr("data-sheet-id"))) {
            $(this)
                .find(".save-button")
                .text("Saved to library")
                .prop("disabled", true)
                .attr("aria-pressed", "true");
        }
    });

    // INTERACTION 1: delegated CLICK handles even dynamically generated cards.
    $("main").on("click", ".save-button", function () {
        const $card = $(this).closest(".sheet-card");
        const id = $card.attr("data-sheet-id");
        if (!pieces.some((piece) => piece.id === id) || Object.hasOwn(library, id)) return;
        library[id] = "planned";
        if (!persist()) {
            delete library[id];
            $card
                .find(".card-notices")
                .empty()
                .append(
                    $("<p>", {
                        class: "card-feedback error",
                        text: "Could not save. Allow site storage and try again.",
                    }),
                );
            return;
        }
        // Modify existing card/button, then create a NEW feedback paragraph.
        $card.addClass("is-saved");
        $(this).text("Saved to library").prop("disabled", true).attr("aria-pressed", "true");
        $card
            .find(".card-notices")
            .empty()
            .append(
                $("<p>", {
                    class: "card-feedback",
                    text: "Saved. Open My library to track your practice.",
                }),
            );
    });

    // INTERACTION 2: CHANGE, with closest() and find() for scoped DOM traversal.
    $(".practice-select").on("change", function () {
        const $card = $(this).closest(".sheet-card");
        const id = $card.attr("data-sheet-id");
        const status = $(this).val();
        if (!Object.hasOwn(labels, status)) return;
        const previous = library[id];
        library[id] = status;
        if (!persist()) {
            library[id] = previous;
            $(this).val(previous);
            $card
                .find(".card-notices")
                .empty()
                .append(
                    $("<p>", {
                        class: "practice-note error",
                        text: "Could not save the status. Allow site storage and try again.",
                    }),
                );
            return;
        }
        // Modify existing badge/card, then generate a NEW practice note.
        $card.removeClass("is-planned is-practicing is-learned").addClass("is-" + status);
        $card.find(".practice-badge").text(labels[status]);
        $card
            .find(".card-notices")
            .empty()
            .append($("<p>", { class: "practice-note", text: tips[status] }));
    });

    // The add page is a simple preview, using native required-field validation.
    $("#add-form").on("submit", function (event) {
        event.preventDefault();
        $("#piece-title, #piece-description").each(function () {
            $(this).val($(this).val().trim());
        });
        if (!this.reportValidity()) return;
        $("#preview-title").text($("#piece-title").val());
        $("#preview-meta").text(
            $("#piece-difficulty").val() +
                ($("#piece-composer").val().trim()
                    ? " · " + $("#piece-composer").val().trim()
                    : ""),
        );
        $("#preview-description").text($("#piece-description").val());
        $("#form-status")
            .empty()
            .append(
                $("<p>", {
                    class: "status",
                    text: "Preview ready. This demo does not publish an entry or upload a file.",
                }),
            );
    });
});
