import { weatherIcon } from "../../../utilities/IconsUtils";
import { TodayForecastInterface } from "../../../utilities/DataUtils";
import { TodayWeatherInterface } from "../../../api/OpenWeatherService";

interface DailyForecastItemInterface {
  data: TodayWeatherInterface;
  item: TodayForecastInterface;
}

const DailyForecastItem = ({ data, item }: DailyForecastItemInterface) => {
  return (
    <div className="w-full text-center py-2 px-5 rounded-md bg-gradientDailyForecast shadow-dailyForecast">
      <h3>{item.time}</h3>
      <div className="flex flex-col items-center">
        <img
          className="w-12 h-auto"
          src={weatherIcon(`${data.weather[0].icon}`)}
          alt="weather"
        />
        <h3 className="font-semibold uppercase">{item.temperature}</h3>
      </div>
    </div>
  );
};

export default DailyForecastItem;
