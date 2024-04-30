import AirIcon from "../../../assets/icons/air-conditions/air.svg";
import CloudsIcon from "../../../assets/icons/air-conditions/clouds.svg";
import HumidityIcon from "../../../assets/icons/air-conditions/humidity.svg";
import ThermostatIcon from "../../../assets/icons/air-conditions/thermostat.svg";

export interface AirConditionsInterface {
  condition: "temperature" | "wind" | "clouds" | "humidity";
  value: string;
}

export default function AirConditionItem({
  condition,
  value,
}: AirConditionsInterface) {
  let iconUrl;
  let description;

  switch (condition) {
    case "temperature":
      iconUrl = ThermostatIcon;
      description = "Real Feel";
      break;
    case "wind":
      iconUrl = AirIcon;
      description = "Wind";
      break;
    case "clouds":
      iconUrl = CloudsIcon;
      description = "Clouds";
      break;
    case "humidity":
      iconUrl = HumidityIcon;
      description = "Humidity";
      break;
  }

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <img
          className="w-8 lg:w-10 h-auto"
          src={iconUrl}
          alt={`${description} icon`}
        />
        <p className="text-sm lg:text-base">{description}</p>
      </div>
      {value}
    </div>
  );
}
