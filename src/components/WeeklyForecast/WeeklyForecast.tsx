import Container from "../Sharable/Container";
import { getWeekDays } from "../../utilities/DatetimeUtils";
import DayWeatherDetails from "./DayWeatherDetails";
import { weatherIcon } from "../../utilities/IconsUtils";
import WeeklyForecastItem from "./WeeklyForecastItem";
import Error from "../Sharable/Error";
import { WeekForecastInterface } from "../../api/OpenWeatherService";

interface WeeklyForecastInterface {
  data: WeekForecastInterface;
}

export default function WeeklyForecast({ data }: WeeklyForecastInterface) {
  const ErrorMessage = "Weekly forecast isn't available";
  const forecastDays = getWeekDays();

  if (!data.list?.length) return <Error message={ErrorMessage} />;

  return (
    <Container title={"Weekly forecast"}>
      <div className="flex flex-col gap-2">
        {data.list.map((item, idx) => {
          return (
            <div
              className="grid grid-cols-3 gap-2 py-2 px-4 rounded-md bg-gradientDailyForecast shadow-dailyForecast"
              key={idx}
            >
              <DayWeatherDetails
                day={forecastDays[idx]}
                imageUrl={weatherIcon(`${item.icon}`)}
                description={item.description}
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <WeeklyForecastItem
                  condition={"temperature"}
                  value={`${Math.round(item.temp)} °C`}
                />
                <WeeklyForecastItem
                  condition={"clouds"}
                  value={`${item.clouds} %`}
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <WeeklyForecastItem
                  condition={"wind"}
                  value={`${item.wind} m/s`}
                />
                <WeeklyForecastItem
                  condition={"humidity"}
                  value={`${item.humidity} %`}
                />
              </div>
            </div>
          );
        })}
        {/*{data.list.length === 5 && (*/}
        {/*  <div className="flex items-center py-2">*/}

        {/*  </div>*/}
        {/*)}*/}
      </div>
    </Container>
  );
}
