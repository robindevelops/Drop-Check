const Fuse = require("fuse.js");

/**
 * Check if a search term fuzzy-matches any name in the list.
 * @param {string} search - The user's search term (e.g. "magic")
 * @param {string[]} names - Array of item names from the shop (e.g. ["Magik", "Star Wand"])
 * @param {number} threshold - Fuse.js threshold (0 = exact, 1 = match anything). Default 0.4
 * @returns {boolean} true if a close-enough match is found
 */
function fuzzyMatch(search, names, threshold = 0.4) {
    if (!names.length) return false;

    const fuse = new Fuse(names, {
        threshold,
        distance: 100,
        includeScore: true,
    });

    const results = fuse.search(search);
    return results.length > 0;
}

module.exports = { fuzzyMatch };
