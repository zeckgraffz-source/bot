const fs = require("fs");
const path = require("path");

const warnsFile = path.join(__dirname, "..", "data", "warns.json");
const mutesFile = path.join(__dirname, "..", "data", "mutes.json");

// Charger JSON
function loadJSON(file) {
    if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    }
    return {};
}

// Sauver JSON
function saveJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

// ⚠️ WARN SYSTEM
function addWarn(userId) {
    const warns = loadJSON(warnsFile);
    warns[userId] = (warns[userId] || 0) + 1;
    saveJSON(warnsFile, warns);
    return warns[userId];
}

function resetWarns(userId) {
    const warns = loadJSON(warnsFile);
    warns[userId] = 0;
    saveJSON(warnsFile, warns);
}

function getWarns(userId) {
    const warns = loadJSON(warnsFile);
    return warns[userId] || 0;
}

// 🔇 MUTE SYSTEM
function addMute(userId, duration) {
    const mutes = loadJSON(mutesFile);
    if (!mutes[userId]) mutes[userId] = { count: 0, totalTime: 0 };
    mutes[userId].count++;
    mutes[userId].totalTime += duration;
    saveJSON(mutesFile, mutes);
    return mutes[userId];
}

function resetMutes(userId) {
    const mutes = loadJSON(mutesFile);
    mutes[userId] = { count: 0, totalTime: 0 };
    saveJSON(mutesFile, mutes);
}

function getMutes(userId) {
    const mutes = loadJSON(mutesFile);
    return mutes[userId] || { count: 0, totalTime: 0 };
}

module.exports = { addWarn, resetWarns, getWarns, addMute, resetMutes, getMutes };
