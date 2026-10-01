/* GuitarShelf's original behavior. jQuery is the only runtime library. */
/* global jQuery */
"use strict";

jQuery(function ($) {
    // Real editions, source facts and license links; full credits: assets/credits.txt.
    const pieces = [
        {
            id: "carcassi",
            title: "Etude No. 1",
            opus: "Op. 60 No. 1",
            composer: "Matteo Carcassi",
            dates: "1792–1853",
            difficulty: "Intermediate",
            key: "C major",
            meter: "4/4",
            tempo: "Allegro",
            focus: "Scale fluency",
            description:
                "An energetic solo-guitar study with flowing eighth-note scales and a sustained bass line. Practice even finger alternation while keeping the bass audible.",
            tip: "Work on four measures at a time. Keep the moving scale even, then bring out the bass without rushing.",
            edition: "Jeff Covey",
            source: "https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=13",
            license: "Public domain",
            licenseUrl: "https://www.mutopiaproject.org/legal.html",
            history:
                "19th-century composition; the historical source edition is unspecified by Mutopia.",
            audio: "carcassi.ogg",
            audioLabel: "Guitar performance · Jujutacular",
            audioSource: "https://commons.wikimedia.org/wiki/File:Carcassi_Op_60_No_1.ogg",
            audioLicense: "CC BY-SA 3.0",
            audioLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        },
        {
            id: "sor-andante",
            title: "Andante",
            opus: "Op. 1 No. 1",
            composer: "Fernando Sor",
            dates: "1778–1839",
            difficulty: "Intermediate",
            key: "G major",
            meter: "3/4",
            tempo: "Andante",
            focus: "Melody and bass",
            description:
                "The first of Sor’s Six Divertissements pairs a singing upper voice with a moving accompaniment. Its triple meter is a useful setting for balancing melody, bass, and inner notes.",
            tip: "Count three steady beats per measure. Play the melody alone first, then add the accompaniment quietly.",
            edition: "Mark Van den Borre",
            source: "https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=413",
            license: "CC BY-SA 4.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
            history:
                "Mutopia dates the work to the 1820s and identifies an early 19th-century Danish Royal Library edition as its source.",
            audio: "sor-andante.mp3",
            audioLabel: "Synthesized MIDI playback · Mark Van den Borre",
            audioSource: "https://www.mutopiaproject.org/ftp/SorF/O1/sor_op1_1/sor_op1_1.mp3",
            audioLicense: "CC BY-SA 4.0",
            audioLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        },
        {
            id: "sor-theme",
            title: "Thema",
            opus: "Op. 1 No. 5.1",
            composer: "Fernando Sor",
            dates: "1778–1839",
            difficulty: "Advanced",
            key: "C major",
            meter: "2/4",
            tempo: "Andante sostenuto",
            focus: "Chord balance",
            description:
                "A compact theme from Sor’s Six Divertissements, with chordal writing, grace notes, and contrasting dynamics. Shape each phrase while keeping the top note clear.",
            tip: "Block out the chord changes slowly before adding the written rhythm. Observe the repeats and the forte/piano contrast.",
            edition: "Mark Van den Borre",
            source: "https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=455",
            license: "CC BY-SA 3.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
            history:
                "Mutopia dates this divertissement to the 1820s. The score is marked Andante sostenuto and dedicated, with the set, to Mrs Davenport.",
            audio: "sor-theme.mp3",
            audioLabel: "Synthesized MIDI playback · Mark Van den Borre",
            audioSource: "https://www.mutopiaproject.org/ftp/SorF/O1/sor_op_1_5_1/sor_op_1_5_1.mp3",
            audioLicense: "CC BY-SA 3.0",
            audioLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        },
    ];
    const labels = { planned: "To practice", practicing: "Practicing", learned: "Learned" };
    const tips = {
        planned: "Listen once, then read a short phrase at a comfortable tempo.",
        practicing: "Repeat a difficult passage slowly, keeping the pulse even.",
        learned: "Good progress. Revisit the piece next week to keep it fluent.",
    };
    const storageKey = "guitarshelf-project3-real-music";
    let library = { carcassi: "planned" };
    const parameters = new URLSearchParams(window.location.search);
    const query = parameters.get("q") || "";

    // Accept only known piece IDs and valid statuses from browser storage.
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
            class: "notice error",
            text: "Saved data could not be read. The starter library is shown.",
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

    // Shared by search/library. User text is never interpreted as HTML.
    function createCard(piece, isLibrary) {
        const $card = $($("#piece-template").prop("content")).children().first().clone();
        $card.attr("data-sheet-id", piece.id);
        $card
            .find("img")
            .attr({
                src: "assets/previews/" + piece.id + ".png",
                alt: "Score preview: " + piece.composer + ", " + piece.title + ", " + piece.opus,
            });
        $card.find(".piece-focus").text(piece.focus);
        $card.find(".piece-title").text(piece.title + " · " + piece.opus);
        $card.find(".meta").text(piece.composer + " · " + piece.difficulty + " · 1 page");
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

    // REQUIRED SEARCH: a GET form supplies q; this explicit if/else simulates a match.
    if ($("#search-results").length) {
        $("#site-q").val(query);
        if (query.trim().toLowerCase() === "fingerstyle") {
            $("#search-summary").text(
                "3 simulated results for “" +
                    query.trim() +
                    "”. The scores and recordings are real.",
            );
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
                    class: "notice",
                    text: "No sheet music matches this simulated search. Try “fingerstyle” in the header, or browse all three pieces.",
                }),
            );
        }
    }

    // One detail layout serves the three real works; links remain relative.
    if ($("#piece-detail").length) {
        const piece = pieces.find((item) => item.id === (parameters.get("piece") || "carcassi"));
        if (piece) {
            $("#piece-detail").attr("data-sheet-id", piece.id);
            $("#detail-title").text(piece.title);
            $("#detail-focus").text(piece.focus);
            $("#detail-meta").text(piece.composer + " · " + piece.opus);
            $("#detail-description").text(piece.description);
            $("#detail-tip").text(piece.tip);
            $("#detail-image").attr({
                src: "assets/previews/" + piece.id + ".png",
                alt: "Complete score: " + piece.composer + ", " + piece.title + ", " + piece.opus,
            });
            $("#score-download, #score-image-link").attr(
                "href",
                "assets/scores/" + piece.id + ".pdf",
            );
            $("#detail-composer").text(piece.composer + " (" + piece.dates + ")");
            $("#detail-opus").text(piece.opus);
            $("#detail-difficulty").text(piece.difficulty);
            $("#detail-key").text(piece.key + " · " + piece.meter);
            $("#detail-tempo").text(piece.tempo);
            $("#detail-history").text(piece.history);
            $("#edition-credit").text("Typeset by " + piece.edition + " for the Mutopia Project.");
            $("#edition-source").attr("href", piece.source);
            $("#edition-license").attr("href", piece.licenseUrl).text(piece.license);
            $("#piece-audio").attr({
                src: "assets/audio/" + piece.audio,
                "aria-label": "Listen to " + piece.title + ", " + piece.opus,
            });
            $("#audio-label").text(piece.audioLabel);
            $("#audio-source").attr("href", piece.audioSource);
            $("#audio-license").attr("href", piece.audioLicenseUrl).text(piece.audioLicense);
            $("title").text(piece.title + " · " + piece.opus + " | GuitarShelf");
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
                    class: "notice",
                    text: "Your library is empty. Browse sheet music to save a piece.",
                }),
            );
    }

    $(".sheet-card").each(function () {
        if (Object.hasOwn(library, $(this).attr("data-sheet-id"))) {
            $(this)
                .addClass("is-saved")
                .find(".save-button")
                .text("Saved to library")
                .prop("disabled", true)
                .attr("aria-pressed", "true");
        }
    });

    // INTERACTION 1: delegated CLICK also handles cards created after page load.
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
        // Modify an existing card/button, then create a NEW feedback paragraph.
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

    // INTERACTION 2: distinct CHANGE event, with closest()/find() DOM traversal.
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
        // Modify an existing badge/card, then generate a NEW practice-note element.
        $card.removeClass("is-planned is-practicing is-learned").addClass("is-" + status);
        $card.find(".practice-badge").text(labels[status]);
        $card
            .find(".card-notices")
            .empty()
            .append($("<p>", { class: "practice-note", text: tips[status] }));
    });

    // Supporting browse controls filter/sort the existing three rows in place.
    function filterBrowse() {
        const selected = $(".level-filter:checked")
            .map(function () {
                return this.value;
            })
            .get();
        const sort = $("#sort").val();
        const ordered = [...pieces];
        if (sort === "title" || sort === "composer")
            ordered.sort((a, b) => a[sort].localeCompare(b[sort]));
        let count = 0;
        ordered.forEach((piece) => {
            const visible = !selected.length || selected.includes(piece.difficulty);
            const $row = $('#browse-results [data-sheet-id="' + piece.id + '"]');
            $row.prop("hidden", !visible).appendTo("#browse-results");
            if (visible) count += 1;
        });
        $("#results-title").text(count + (count === 1 ? " piece" : " pieces"));
        $("#filter-empty").prop("hidden", count > 0);
    }
    $(".level-filter, #sort").on("change", filterBrowse);
    $("#reset-filters").on("click", function () {
        $(".level-filter").prop("checked", false);
        $("#sort").val("featured");
        filterBrowse();
    });

    // Local practice notes, with native validation and safe text insertion.
    $("#note-form").on("submit", function (event) {
        event.preventDefault();
        const note = $("#practice-comment").val().trim();
        $("#practice-comment").val(note);
        if (!this.reportValidity()) return;
        $("#personal-notes").append(
            $("<p>", { class: "notice personal-note", text: "jianpengc: " + note }),
        );
        this.reset();
    });

    // Entry preview only: no file transfer or invented account/publication service.
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
                    : "") +
                " · Uploader: jianpengc · " +
                $("input[name=visibility]:checked").val(),
        );
        $("#preview-description").text($("#piece-description").val());
        const file = $("#piece-file")[0].files[0];
        $("#preview-file").text(
            file ? "Selected file: " + file.name + " (not uploaded)" : "No score file selected.",
        );
        $("#preview-recording").text(
            $("#demo-url").val()
                ? "Recording: " + $("#demo-url").val()
                : "No recording URL supplied.",
        );
        $(".entry-preview").prop("hidden", false);
        $("#form-status")
            .empty()
            .append(
                $("<p>", {
                    class: "notice",
                    text: "Preview ready. Your entry has not been published.",
                }),
            );
    });
});
