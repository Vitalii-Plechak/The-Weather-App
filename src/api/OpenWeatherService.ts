import {GEO_API_URL, WEATHER_API_URL, WEATHER_API_KEY, WEATHER_RAPID_API_KEY} from "../conf";
import { WeekForecastWeatherInterface } from "../utilities/DataUtils";

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": WEATHER_RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export type TodayWeatherInterface = WeatherInterface & {
  city: string;
};

export interface WeekForecastInterface {
  city: string;
  list: WeekForecastWeatherInterface[] | [];
}

export interface WeatherInterface {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}
export interface ForecastInterface {
  city: {
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: [
    {
      clouds: {
        all: number;
      };
      dt: number;
      dt_txt: string;
      main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
      };
      pop: number;
      rain: {
        "3h": number;
      };
      sys: {
        pod: string;
      };
      visibility: number;
      weather: [
        {
          description: string;
          icon: string;
          id: number;
          main: string;
        }
      ];
      wind: {
        deg: number;
        gust: number;
        speed: number;
      };
    }
  ];
  message: number | string;
}

export async function fetchWeatherData(
  lat: string,
  lon: string
): Promise<[WeatherInterface, ForecastInterface]> {
  try {
    const [weatherPromise, forecastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forecastResponse = await forecastPromise.json();

    if (weatherResponse.cod !== 200 && forecastResponse.cod !== 200) {
      throw weatherResponse?.message;
    }

    return Promise.resolve(<[WeatherInterface, ForecastInterface]>[
      weatherResponse,
      forecastResponse,
    ]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface CitiesInterface {
  data: [
    {
      city: string;
      country: string;
      countryCode: string;
      id: number;
      latitude: number;
      longitude: number;
      name: string;
      population: number;
      region: string;
      regionCode: string;
      regionWdId: string;
      type: string;
      wikiDataId: string;
    }
  ];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}

export async function fetchCities(input: string): Promise<CitiesInterface> {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );
    const res = response.json();
    return Promise.resolve(res);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
