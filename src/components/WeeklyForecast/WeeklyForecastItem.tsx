import { AirConditionsInterface } from "../Weather/AirConditions/AirConditionItem";
import ThermostatIcon from "../../assets/icons/air-conditions/thermostat.svg";
import AirIcon from "../../assets/icons/air-conditions/air.svg";
import CloudsIcon from "../../assets/icons/air-conditions/clouds.svg";
import HumidityIcon from "../../assets/icons/air-conditions/humidity.svg";

export default function WeeklyForecastItem({
  condition,
  value,
}: AirConditionsInterface) {
  let iconUrl;

  switch (condition) {
    case "temperature":
      iconUrl = ThermostatIcon;
      break;
    case "wind":
      iconUrl = AirIcon;
      break;
    case "clouds":
      iconUrl = CloudsIcon;
      break;
    case "humidity":
      iconUrl = HumidityIcon;
      break;
  }

  return (
    <div className="flex items-center justify-center gap-2 w-full text-sm">
      <img className="w-6 h-auto" src={iconUrl} alt={`${condition} icon`} />
      <p>{value}</p>
    </div>
  );
}
