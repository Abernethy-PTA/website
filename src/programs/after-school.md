---
title: After School Programs
summary: Live fall enrichment schedule — music, art, sports, science, languages, and more.
eleventyNavigation:
  key: After School Programs
  parent: Programs
  order: 0
templateEngineOverride: md
---

Here's the fall lineup of on-campus after school enrichment programs at Abernethy. This page pulls directly from the committee's live schedule, so it's always current. Questions: [afterschool@supportabernethy.org](mailto:afterschool@supportabernethy.org)

## Weekly schedule

<div id="as-schedule"><p><em>Loading the latest schedule…</em></p></div>

## Program details &amp; signup

<div id="as-details"><p><em>Loading program details…</em></p></div>

Providers interested in operating at Abernethy: apply via [Facilitron](https://www.facilitron.com/aks97214).

<style>
/* break out of the narrow content column so the full week fits on desktop */
.as-scroll { overflow-x: auto; margin: 0.5rem 0 1.5rem; width: min(65.5rem, calc(100vw - 2.5rem)); }
.as-scroll table { min-width: 54rem; }
#as-schedule td { vertical-align: top; }
#as-schedule td div { margin-bottom: 0.1rem; }
#as-schedule td div:first-child { font-weight: 800; }
.as-fallback a { word-break: break-all; }
</style>

<script>
(function () {
  var SHEET = "https://docs.google.com/spreadsheets/d/1-_Hvz1OfYxnuah1dVOcut39TeqGr4lnf5r8zgmIVEKQ";
  var EDIT_URL = SHEET + "/edit";
  function csvUrl(gid) {
    return SHEET + "/gviz/tq?tqx=out:csv&headers=1&gid=" + gid;
  }

  // Minimal CSV parser (handles quoted fields with commas/newlines)
  function parseCSV(text) {
    var rows = [], row = [], field = "", inQuotes = false, i = 0;
    while (i < text.length) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else { inQuotes = false; }
        } else { field += c; }
      } else if (c === '"') { inQuotes = true; }
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") { i++; }
        row.push(field); field = ""; rows.push(row); row = [];
      } else { field += c; }
      i++;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function el(tag, parent) {
    var node = document.createElement(tag);
    if (parent) { parent.appendChild(node); }
    return node;
  }

  function fail(container) {
    container.innerHTML = "";
    var p = el("p", container);
    p.className = "as-fallback";
    p.appendChild(document.createTextNode("Couldn't load the schedule right now — view it directly in the "));
    var a = el("a", p);
    a.href = EDIT_URL;
    a.textContent = "after school programs spreadsheet";
    p.appendChild(document.createTextNode("."));
  }

  function renderSchedule(rows) {
    var container = document.getElementById("as-schedule");
    container.innerHTML = "";
    var notes = [];
    var wrap = el("div", container);
    wrap.className = "as-scroll";
    var table = el("table", wrap);
    var thead = el("thead", table);
    var headRow = el("tr", thead);
    rows[0].forEach(function (day) {
      if (day.trim()) { el("th", headRow).textContent = day.trim(); }
    });
    var nCols = headRow.children.length;
    var tbody = el("tbody", table);
    rows.slice(1).forEach(function (cells) {
      var slice = cells.slice(0, nCols);
      if (slice.every(function (c) { return !c.trim(); })) { return; }
      if (slice.some(function (c) { return c.trim().indexOf("Notes:") === 0; })) {
        slice.forEach(function (c) {
          c.split("\n").forEach(function (line) {
            line = line.replace(/^\s*[••]\s*|^\s*Notes:\s*$/g, "").trim();
            if (line && line !== "Notes:") { notes.push(line); }
          });
        });
        return;
      }
      var tr = el("tr", tbody);
      for (var i = 0; i < nCols; i++) {
        var td = el("td", tr);
        (slice[i] || "").split("\n").forEach(function (line) {
          if (line.trim()) { el("div", td).textContent = line.trim(); }
        });
      }
    });
    if (notes.length) {
      var h = el("h3", container);
      h.textContent = "Notes";
      var ul = el("ul", container);
      notes.forEach(function (n) { el("li", ul).textContent = n; });
    }
  }

  function renderDetails(rows) {
    var container = document.getElementById("as-details");
    container.innerHTML = "";
    var headers = rows[0];
    var body = rows.slice(1).filter(function (r) {
      return r.some(function (c) { return c.trim(); });
    });
    // keep columns that have a header and at least one value
    var keep = [];
    headers.forEach(function (hdr, i) {
      if (!hdr.trim()) { return; }
      var hasData = body.some(function (r) { return (r[i] || "").trim(); });
      if (hasData) { keep.push(i); }
    });
    var wrap = el("div", container);
    wrap.className = "as-scroll";
    var table = el("table", wrap);
    var headRow = el("tr", el("thead", table));
    keep.forEach(function (i) { el("th", headRow).textContent = headers[i].trim(); });
    var tbody = el("tbody", table);
    body.forEach(function (r) {
      var tr = el("tr", tbody);
      keep.forEach(function (i) {
        var td = el("td", tr);
        var val = (r[i] || "").trim();
        if (/^https?:\/\/\S+$/.test(val)) {
          var a = el("a", td);
          a.href = val;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = "Sign up";
        } else {
          td.textContent = val;
        }
      });
    });
  }

  function load(gid, render, containerId) {
    fetch(csvUrl(gid))
      .then(function (resp) {
        if (!resp.ok) { throw new Error("HTTP " + resp.status); }
        return resp.text();
      })
      .then(function (text) {
        var rows = parseCSV(text);
        if (rows.length < 2) { throw new Error("empty sheet"); }
        render(rows);
      })
      .catch(function () { fail(document.getElementById(containerId)); });
  }

  load("0", renderSchedule, "as-schedule");
  load("385616781", renderDetails, "as-details");
})();
</script>
