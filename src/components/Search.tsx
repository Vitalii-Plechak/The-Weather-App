import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities } from "../api/OpenWeatherService";
import { SingleValue } from "react-select";

interface CityInterface {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
}

export interface SearchDataInterface {
  label: string;
  value: string;
}

interface OptionsInterface {
  options: SearchDataInterface[];
}

type onSearchChangeType = {
  onSearchChange: (searchData: SingleValue<SearchDataInterface>) => void;
};

export function Search({ onSearchChange }: onSearchChangeType) {
  const [searchValue, setSearchValue] =
    useState<SingleValue<SearchDataInterface>>();

  const loadOptions = async (inputValue: string): Promise<OptionsInterface> => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city: CityInterface) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const onChangeHandler = (enteredData: SingleValue<SearchDataInterface>) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <div className="text-black">
      <AsyncPaginate
        placeholder="Search for cities"
        debounceTimeout={600}
        value={searchValue}
        onChange={onChangeHandler}
        loadOptions={loadOptions}
      />
    </div>
  );
}
