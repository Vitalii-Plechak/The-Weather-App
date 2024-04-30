import { useState } from "react";
import Header from "./components/Header/Header";
import { Search, SearchDataInterface } from "./components/Search";
import Weather from "./components/Weather/Weather";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import {
  fetchWeatherData,
  TodayWeatherInterface,
  WeekForecastInterface,
} from "./api/OpenWeatherService";
import { transformDateFormat } from "./utilities/DatetimeUtils";
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
  TodayForecastInterface,
} from "./utilities/DataUtils";
import { ALL_DESCRIPTIONS } from "./utilities/DateConstants";
import Loader from "./components/Sharable/Loader";
import { SingleValue } from "react-select";
import Error from "./components/Sharable/Error";
import SunIcon from "./assets/icons/sun.svg"

function App() {
  const [todayWeather, setTodayWeather] = useState<TodayWeatherInterface>();
  const [todayForecast, setTodayForecast] = useState<
    TodayForecastInterface[] | []
  >([]);
  const [weekForecast, setWeekForecast] = useState<WeekForecastInterface>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearchChange(
    searchData: SingleValue<SearchDataInterface>
  ) {
    if (!searchData) return;

    const [latitude, longitude] = searchData.value.split(" ");

    if (!latitude && !longitude) return;

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    const dateNow = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);

      const todayForecastsList = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dateNow
      );
      const weekForecastsList = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      setTodayForecast([...todayForecastsList]);
      setTodayWeather({ city: searchData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: searchData.label,
        list: weekForecastsList,
      });
    } catch (err) {
      console.error(err);
      if (typeof err === "string") setError(err);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col w-full lg:w-[80vw] max-w-screen-lg mx-auto border-2 rounded-xl p-4 min-h-[680px]">
      <Header />
      <Search onSearchChange={handleSearchChange} />

      <div className="grow content-center text-center">
        {error && <Error message={error} />}

        {((!todayWeather && !todayForecast?.length) || !weekForecast) &&
          !isLoading &&
          !error && (
            <div className="flex items-center justify-center flex-col gap-2">
              <img className="w-32 h-32" src={SunIcon} alt="Sun icon"/>
              Explore current weather data and 6-day forecast of more than
              200,000 cities!
            </div>
          )}

        {isLoading && !error && <Loader />}

        {((todayWeather && todayForecast?.length) || weekForecast) &&
          !isLoading &&
          !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-8">
              {todayWeather && (
                <Weather data={todayWeather} forecastList={todayForecast} />
              )}
              {weekForecast && <WeeklyForecast data={weekForecast} />}
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
