export function timeSince(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function colorPicker() {
  const colors = [
    "red",
    "blue",
    "purple",
    "green",
    "indigo",
    "yellow",
    "pink",
    "cream-orange",
    "cyan",
    "light-green",
    "deep-orange",
    "amber",
    "light-blue",
    "fuscia",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
