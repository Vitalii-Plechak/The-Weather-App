interface TemperatureDetailsInterface {
  temperature: number;
  description: string;
}

export default function TemperatureDetails({
  temperature,
  description,
}: TemperatureDetailsInterface) {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h3 className="font-semibold uppercase mb-1">
        {Math.round(temperature)} °C
      </h3>
      <h4>{description}</h4>
    </div>
  );
}
