import DailyForecastItem from "./DailyForecastItem";
import { TodayForecastInterface } from "../../../utilities/DataUtils";
import { TodayWeatherInterface } from "../../../api/OpenWeatherService";
import Error from "../../Sharable/Error";

interface DailyForecastInterface {
  data: TodayWeatherInterface;
  forecastList: TodayForecastInterface[] | [];
}

const DailyForecast = ({ data, forecastList }: DailyForecastInterface) => {
  const ErrorMessage = "Daily forecast isn't available";
  const isDataProvided =
    data?.cod !== 404 &&
    data &&
    forecastList?.length > 0 &&
    Object.keys(data).length > 0;

  if (!isDataProvided) return <Error message={ErrorMessage} />;

  return (
    <div className="flex justify-center w-full gap-3 overflow-x-auto">
      {Object.keys(forecastList)?.length &&
        forecastList.map((item, idx) => (
          <div className="flex flex-col items-center" key={idx}>
            <DailyForecastItem item={item} data={data} />
          </div>
        ))}
    </div>
  );
};

export default DailyForecast;
