interface WeatherIconDetailsInterface {
  src: string;
}

export default function WeatherIconDetails({
  src,
}: WeatherIconDetailsInterface) {
  return (
    <div className="flex justify-center items-center h-full">
      <img className="w-12 h-auto" src={src} alt="weather" />
    </div>
  );
}
