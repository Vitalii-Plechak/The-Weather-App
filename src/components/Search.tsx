import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  fetchCities,
  fetchCurrentCity,
  ReverseGeocodingInterface,
} from "../api/OpenWeatherService";
import { SingleValue } from "react-select";
import PinIcon from "../assets/icons/pin.svg";

export interface SearchDataInterface {
  label: string;
  value: string;
}

interface OptionsInterface {
  options: SearchDataInterface[];
}

type onSearchChangeType = {
  onSearchChange: (searchData: SingleValue<SearchDataInterface>) => void;
  setIsLoading: (isloading: boolean) => void;
};

export function Search({ onSearchChange, setIsLoading }: onSearchChangeType) {
  const [searchValue, setSearchValue] =
    useState<SingleValue<SearchDataInterface>>();

  const loadByCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const currentCity = await fetchCurrentCity(position);

          const enteredData: OptionsInterface = {
            options: [
              {
                value: `${currentCity[0].lat} ${currentCity[0].lon}`,
                label: `${currentCity[0].name}, ${currentCity[0].country}`,
              },
            ],
          };

          onChangeHandler(enteredData.options[0]);
        },
        (err: GeolocationPositionError) => {
          console.error(`"Error getting user location: ${err?.message}`);
          setIsLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const loadOptions = async (inputValue: string): Promise<OptionsInterface> => {
    if (!inputValue.length) return { options: [] };

    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.map((city: ReverseGeocodingInterface) => {
        return {
          value: `${city.lat} ${city.lon}`,
          label: `${city.name}, ${city.country}`,
        };
      }),
    };
  };

  const onChangeHandler = (enteredData: SingleValue<SearchDataInterface>) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <div className="flex items-center gap-2 text-black w-full">
      <button
        type="button"
        title="Find by current location"
        onClick={loadByCurrentLocation}
      >
        <img className="w-8" src={PinIcon} alt="Pin Icon" />
      </button>
      <AsyncPaginate
        placeholder="Search for cities"
        debounceTimeout={600}
        value={searchValue}
        onChange={onChangeHandler}
        loadOptions={loadOptions}
        className="w-full"
      />
    </div>
  );
}
