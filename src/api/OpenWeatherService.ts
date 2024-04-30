import {
  WEATHER_API_GEOCODING_URL,
  WEATHER_API_KEY,
  WEATHER_API_URL,
} from "../conf";
import { WeekForecastWeatherInterface } from "../utilities/DataUtils";

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

    if (weatherResponse.cod !== 200 && forecastResponse.cod !== 200)
      throw weatherResponse?.message;

    return <[WeatherInterface, ForecastInterface]>[
      weatherResponse,
      forecastResponse,
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export interface ReverseGeocodingInterface {
  country: string;
  lat: number;
  local_names: { [key: string]: string };
  lon: number;
  name: string;
  state: string;
}

export async function fetchCities(
  input: string
): Promise<ReverseGeocodingInterface[]> {
  try {
    const response = await fetch(
      `${WEATHER_API_GEOCODING_URL}/direct?q=${input}&limit=5&appid=${WEATHER_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchCurrentCity(
  position: GeolocationPosition
): Promise<ReverseGeocodingInterface[]> {
  try {
    const response = await fetch(
      `${WEATHER_API_GEOCODING_URL}/reverse?lat=${position.coords.latitude}8&lon=${position.coords.longitude}&limit=1&appid=${WEATHER_API_KEY}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
