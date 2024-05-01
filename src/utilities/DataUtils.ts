import { ForecastInterface } from "../api/OpenWeatherService";
import { AllDescriptionsInterface } from "./DateConstants";

interface GroupInterface<T> {
  [key: string | number]: T[];
}

export function groupBy(key: string) {
  return function group<T>(array: T[]): GroupInterface<T> {
    return array.reduce<GroupInterface<T>>((acc, obj) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const property = obj[key] as string;
      acc[property] = acc[property] || [];
      acc[property].push(obj);
      return acc;
    }, {} as GroupInterface<T>);
  };
}

export function getAverage<T extends number>(array: T[], isRound = true) {
  let average = 0;

  if (isRound) {
    average = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    if (average === 0) {
      average = 0;
    }
  } else {
    average = +(array.reduce((a, b) => a + b, 0) / array.length).toFixed(2);
  }

  return average;
}

export function getMostFrequentWeather(arr: string[]): string {
  const hashmap = arr.reduce((acc, val): Record<string, number> => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

export function descriptionToIconName(
  description: string,
  descriptionsList: AllDescriptionsInterface[]
) {
  const iconName = descriptionsList.find(
    (item) => item.description === description
  );
  return iconName?.icon || "unknown";
}

export interface WeekForecastWeatherInterface {
  date: string;
  temp: number;
  humidity: number;
  wind: number;
  clouds: number;
  description: string;
  icon: string;
}

interface ForecastData {
  date: string;
  temp: number;
  humidity: number;
  wind: number;
  clouds: number;
}

interface DescriptionsData {
  description: string;
  date: string;
}

export const getWeekForecastWeather = (
  response: ForecastInterface,
  descriptionsList: AllDescriptionsInterface[]
): WeekForecastWeatherInterface[] | [] => {
  const forecastData = <ForecastData[]>[];
  const descriptionsData = <DescriptionsData[]>[];

  if (!response || Object.keys(response).length === 0 || response.cod === "404")
    return [];
  else
    response?.list.slice().map((item, idx) => {
      descriptionsData.push({
        description: item.weather[0].description,
        date: item.dt_txt.substring(0, 10),
      });
      forecastData.push({
        date: item.dt_txt.substring(0, 10),
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        clouds: item.clouds.all,
      });

      return { idx, item };
    });

  const groupByDate = groupBy("date");
  const groupedForecastData = groupByDate(forecastData);
  const groupedForecastDescriptions = groupByDate(descriptionsData);

  const descriptionKeys = Object.keys(groupedForecastDescriptions);

  const dayDescList = <string[]>[];

  descriptionKeys.forEach((key) => {
    const singleDayDescriptions: string[] = groupedForecastDescriptions[
      key
    ].map((item) => item.description);
    const mostFrequentDescription = getMostFrequentWeather(
      singleDayDescriptions
    );
    dayDescList.push(mostFrequentDescription);
  });

  const forecastKeys = Object.keys(groupedForecastData);
  const dayAvgsList = <WeekForecastWeatherInterface[]>[];

  forecastKeys.forEach((key, idx) => {
    const dayTempsList: number[] = [];
    const dayHumidityList: number[] = [];
    const dayWindList: number[] = [];
    const dayCloudsList: number[] = [];

    for (let i = 0; i < groupedForecastData[key].length; i++) {
      dayTempsList.push(groupedForecastData[key][i].temp);
      dayHumidityList.push(groupedForecastData[key][i].humidity);
      dayWindList.push(groupedForecastData[key][i].wind);
      dayCloudsList.push(groupedForecastData[key][i].clouds);
    }

    dayAvgsList.push({
      date: key,
      temp: getAverage(dayTempsList),
      humidity: getAverage(dayHumidityList),
      wind: getAverage(dayWindList, false),
      clouds: getAverage(dayCloudsList),
      description: dayDescList[idx],
      icon: descriptionToIconName(dayDescList[idx], descriptionsList),
    });
  });

  return dayAvgsList;
};

export interface TodayForecastInterface {
  time: string;
  icon: string;
  temperature: string;
}

export const getTodayForecastWeather = (
  response: ForecastInterface,
  currentData: string,
  currentDataTime: number
): TodayForecastInterface[] | [] => {
  const todayForecast = <TodayForecastInterface[]>[];

  if (
    !response ||
    Object.keys(response).length === 0 ||
    response.cod === "404"
  ) {
    return [];
  } else {
    response?.list.map((item) => {
      if (item.dt_txt.startsWith(currentData.substring(0, 10))) {
        if (item.dt > currentDataTime) {
          todayForecast.push({
            time: item.dt_txt.split(" ")[1].substring(0, 5),
            icon: item.weather[0].icon,
            temperature: Math.round(item.main.temp) + " °C",
          });
        }
      }
      return todayForecast;
    });
  }

  if (todayForecast.length < 7) {
    return todayForecast;
  } else {
    return todayForecast.slice(-6);
  }
};
