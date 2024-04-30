import AirConditionItem from "./AirConditionItem";
import Error from "../../Sharable/Error";
import { TodayWeatherInterface } from "../../../api/OpenWeatherService";

interface AirConditionsInterface {
  data: TodayWeatherInterface;
}

export default function AirConditions({ data }: AirConditionsInterface) {
  const ErrorMessage = "Current air conditions aren't available";
  const isDataProvided =
    data?.cod !== 404 && data && Object.keys(data).length > 0;

  if (!isDataProvided) return <Error message={ErrorMessage} />;

  return (
    <div className="grid grid-cols-4 items-center gap-3">
      <AirConditionItem
        value={`${Math.round(data.main.feels_like)} °C`}
        condition={"temperature"}
      />
      <AirConditionItem value={`${data.wind.speed} m/s`} condition={"wind"} />
      <AirConditionItem
        value={`${Math.round(data.clouds.all)} %`}
        condition={"clouds"}
      />
      <AirConditionItem
        value={`${Math.round(data.main.humidity)} %`}
        condition={"humidity"}
      />
    </div>
  );
}
