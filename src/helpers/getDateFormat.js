const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDateFormat = (ms) => {
  if (isNaN(ms)) {
    //data.json has default createdAt as string, not ms

    return ms;
  }

  const minutes = Math.floor((Date.now() - ms) / 60000);
  const hours = Math.floor((Date.now() - ms) / 3600000);
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (minutes < 1) {
    return "just now";
  }

  if (hours >= 24) {
    return `${day} ${monthNames[month]} ${year}`;
  }

  if (hours > 0) {
    return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  }

  return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
};

export default getDateFormat;
