interface CityDateDetailInterface {
  city: string;
  date: string;
}

export default function CityDetails({ city, date }: CityDateDetailInterface) {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h3 className="text-sm lg:text-base font-semibold uppercase mb-1">
        {city}
      </h3>
      <h4>{date}</h4>
    </div>
  );
}
