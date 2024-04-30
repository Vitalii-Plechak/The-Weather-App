import CityDetails from "./CityDetails";
import TemperatureDetails from "./TemperatureDetails";
import WeatherIconDetails from "./WeatherIconDetails";
import { getDayMonthFromDate } from "../../../utilities/DatetimeUtils";
import { weatherIcon } from "../../../utilities/IconsUtils";
import Error from "../../Sharable/Error";
import { TodayWeatherInterface } from "../../../api/OpenWeatherService";

interface CurrentWeatherInterface {
  data: TodayWeatherInterface;
}

export default function CurrentWeather({ data }: CurrentWeatherInterface) {
  const ErrorMessage = "Current weather isn't available";
  const dayMonth = getDayMonthFromDate();
  const isDataProvided =
    data?.cod !== 404 && data && Object.keys(data).length > 0;

  if (!isDataProvided) return <Error message={ErrorMessage} />;

  return (
    <div className="grid grid-cols-3 items-center gap-3">
      <CityDetails city={data.city} date={dayMonth} />
      <TemperatureDetails
        temperature={data.main.temp}
        description={data.weather[0].description}
      />
      <WeatherIconDetails src={weatherIcon(`${data.weather[0].icon}`)} />
    </div>
  );
}
