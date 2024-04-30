import { MONTHS, DAYS } from "./DateConstants";

const date = new Date();

export function getWeekDays() {
  const dayInAWeek = new Date().getDay();
  return DAYS.slice(dayInAWeek, DAYS.length).concat(DAYS.slice(0, dayInAWeek));
}

export function getDayMonthFromDate() {
  const month = MONTHS[date.getMonth()].slice(0, 3);
  const day = date.getUTCDate();
  return day + " " + month;
}

export function transformDateFormat() {
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  return year.toString().concat("-", month, "-", day, " ", time);
}

export function getUTCDatetime() {
  const utcTime = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });

  const isoDateString = new Date().toISOString();
  return isoDateString.split("T")[0].concat(" ", utcTime);
}

export function getUTCTime() {
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });
}
