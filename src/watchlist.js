// In-memory watchlist with helper methods
let items = ["Star Wand"];

const watchlist = {
    add(item) {
        items.push(item);
    },
    remove(item) {
        const i = items.findIndex((w) => w.toLowerCase() === item.toLowerCase());
        if (i !== -1) items.splice(i, 1);
    },
    has(item) {
        return items.some((w) => w.toLowerCase() === item.toLowerCase());
    },
    list() {
        return [...items];
    },
};

module.exports = { watchlist };
