interface DayWeatherDetailsInterface {
  day: string;
  imageUrl: string;
  description: string;
}

const DayWeatherDetails = ({
  day,
  imageUrl,
  description,
}: DayWeatherDetailsInterface) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h4 className="text-base font-semibold">{day}</h4>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
        <img
          className="w-6 h-auto"
          src={imageUrl}
          alt={`${description} icon`}
        />
        <h4 className="text-sm">{description}</h4>
      </div>
    </div>
  );
};

export default DayWeatherDetails;
