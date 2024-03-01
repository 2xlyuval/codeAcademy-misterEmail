export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  formatTimeStamp,
  getStringBeforeChar,
};

function makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function saveToStorage(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue;
  return JSON.parse(value);
}

function formatTimeStamp(timestamp) {
  const dt = new Date(timestamp); // Convert timestamp to milliseconds
  const today = new Date(); // Get today's date

  // Check if the date of the timestamp is today
  if (
    dt.getDate() === today.getDate() &&
    dt.getMonth() === today.getMonth() &&
    dt.getFullYear() === today.getFullYear()
  ) {
    // Return time with hours and seconds
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
    return dt.toLocaleTimeString([], timeOptions);
  } else {
    // Return date
    const month = dt.toLocaleDateString([], { month: "short" });
    const day = dt.toLocaleDateString([], { day: "2-digit" });
    return `${day} ${month}`;
  }
}

function getStringBeforeChar(string, char) {
  return string.substring(0, string.indexOf(char));
}
