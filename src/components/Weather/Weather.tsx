import CurrentWeather from "./CurrentWeather/CurrentWeather";
import AirConditions from "./AirConditions/AirConditions";
import Container from "../Sharable/Container";
import DailyForecast from "./Forecast/DailyForecast";
import { TodayForecastInterface } from "../../utilities/DataUtils";
import { TodayWeatherInterface } from "../../api/OpenWeatherService";

interface WeatherInterface {
  data: TodayWeatherInterface;
  forecastList: TodayForecastInterface[] | [];
}

export default function Weather({ data, forecastList }: WeatherInterface) {
  let subHeader;

  if (forecastList?.length > 0) {
    subHeader =
      forecastList.length === 1
        ? "1 available forecast"
        : `${forecastList.length} available forecasts`;
  } else {
    subHeader = "No available forecasts for tonight.";
  }

  return (
    <div className="flex flex-col gap-8">
      <Container title={"Current weather"}>
        <CurrentWeather data={data} />
      </Container>
      <Container title={"Air conditions"}>
        <AirConditions data={data} />
      </Container>
      <Container
        title={"Today's forecast"}
        sectionSubHeader={`${forecastList?.length ? subHeader : ""}`}
      >
        <DailyForecast data={data} forecastList={forecastList} />
      </Container>
    </div>
  );
}
